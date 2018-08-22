import { object, string, ObjectSchema } from "joi";

export const questionSchema : ObjectSchema = object().keys({
    question: string().regex(/[a-zA-Z0-9\-'\\\$%£&()!_/]+\?$/).min(1).max(255).required()
})