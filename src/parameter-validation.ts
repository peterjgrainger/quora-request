import {validate, ObjectSchema} from 'joi'
import { Context } from 'koa';

export function parameterValidation(schema:ObjectSchema) {
    return async(ctx: Context, next: () => Promise<any>) => {
        let result = ''
        try {
            await validate(ctx.request.body, schema);
            await next()
        } catch(error) {
            ctx.status = 400
            ctx.body = error.message
        }
        
    }
}