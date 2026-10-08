import { error } from 'console';
import { z } from 'zod';

export const colaboradorSchema = z.object({
    nome: z.string().min(3,{message: 'O nome deve ter no mínimo 3 letras!'}),
    email: z.email({message: 'O email é inválido!'}),
    idade: z.number({error:'A idade deve ser um número!'})
    .min(18,{message:'A idade mínima é 18 anos!'})
    .max(65,{message:'A idade máxima é 65 anos!'}),
    departamento: z.enum(['TI', 'RH', 'Financeiro'],{
        error: () => ({
            message: 'O departamento deve ser obrigatoriamente TI, RH ou Financeiro!'
        }),
    }),
});
export type Colaborador = z.infer<typeof colaboradorSchema>;