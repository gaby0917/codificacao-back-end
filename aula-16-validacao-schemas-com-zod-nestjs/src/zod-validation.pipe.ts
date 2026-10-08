import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { STATUS_CODES } from "http";
import { parse } from "path";
import { metadata } from "reflect-metadata/no-conflict";
import { z } from 'zod';

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: z.ZodType){}
        transform(value: unknown, metadata: ArgumentMetadata) {
            if(metadata.type !== 'body') return value;
            const parseResult = this.schema.safeParse(value);
            if(!parseResult.success){
                const formattedErrors = parseResult.error.issues.map((issue) =>({
                    campo: issue.path.join('.'),
                    mensagem: issue.message,
                }));
                throw new BadRequestException({
                    statusCode: 400,
                    errors: formattedErrors,
                });
            }
            return parseResult.data;
    }
}