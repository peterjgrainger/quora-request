import * as koa from 'koa'
import * as koaRouter from 'koa-router'
import * as koaBody from 'koa-body'
import {addQuestion, findQuestion} from 'quora-automation'
import { DEPLOYMENT_TYPES } from 'quora-automation/js/deployment-types';

const app = new koa()
const router = new koaRouter()
const deployment = process.env.DOCKER_DEPLOYMENT ? 
                        DEPLOYMENT_TYPES.DOCKER : DEPLOYMENT_TYPES.LOCAL

app.use(async (ctx, next) => {
    const authHeader = ctx.request.header.authorization
    const token = authHeader.replace('Bearer ', '')
    const validToken = new Buffer(token, 'base64').toString('ascii') === process.env.API_KEY
    if(validToken) {
        await next();
    } else {
        ctx.status = 401
    }
})

app.use(koaBody())

router.post('/question/add', async(ctx) => {
    const result = await addQuestion(ctx.request.body.question, {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        deploymentType: deployment
    })

    ctx.body = result
})

router.post('/question/find', async(ctx) => {
    try {
        ctx.body = await findQuestion(ctx.request.body.question, deployment)
        
    } catch(error) {
        console.log('issue', error)
    }
} )

router.get('/status', async(ctx) => {
    ctx.status = 200
} )

app.use(router.routes())

app.listen(3000)

console.log('listening...')