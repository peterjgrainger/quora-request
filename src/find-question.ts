import { Context } from "koa";
import {findQuestion} from 'quora-automation'
import { DEPLOYMENT_TYPES } from 'quora-automation/js/deployment-types';
const deployment = process.env.DOCKER_DEPLOYMENT ? 
                        DEPLOYMENT_TYPES.DOCKER : DEPLOYMENT_TYPES.LOCAL

export async function findQuestionRoute(ctx:Context) {
    try {
        ctx.body = await findQuestion(ctx.request.body.question, deployment)
        
    } catch(error) {
        console.log('issue', error)
    }
} 