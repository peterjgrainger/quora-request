import * as koa from 'koa'
import * as koaRouter from 'koa-router'
import * as koaBody from 'koa-body'
import * as koaHelmet from 'koa-helmet'

import { tokenCheck } from './token-check';
import { addQuestionRoute } from './add-question';
import { findQuestionRoute } from './find-question';
import {parameterValidation} from './parameter-validation'
import { questionSchema } from './question-schema';

const app = new koa()
const router = new koaRouter()

app.use(koaBody())
app.use(koaHelmet());

router.post('/question/add', 
            tokenCheck, 
            parameterValidation(questionSchema),
            addQuestionRoute)

router.post('/question/find', 
            tokenCheck, 
            parameterValidation(questionSchema),
            findQuestionRoute)

router.get('/status', async(ctx) => {
    ctx.status = 200
} )

app.use(router.routes())

app.listen(process.env.PORT || 3000)

console.log('listening...')