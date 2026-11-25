import Joi from 'joi';

export function ValidadeEnv<T>(config: Record<string, any>, schema: Joi.ObjectSchema<T>){
    const {error, value} = schema.validate(config, {
        allowUnknown: true,
        abortEarly: false,
    });

    if(error){
        throw new Error(`[Config Validation Error]: ${error.message}`);
    }

    return value;
}