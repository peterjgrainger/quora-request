import { Context } from "koa";
import {addQuestion} from 'quora-automation'
import { DEPLOYMENT_TYPES } from 'quora-automation/js/deployment-types';
import * as Rollbar from 'rollbar'

const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true
  });


const deployment = process.env.DOCKER_DEPLOYMENT ? 
                        DEPLOYMENT_TYPES.DOCKER : DEPLOYMENT_TYPES.LOCAL


export async function addQuestionRoute(ctx:Context) {
    const result = await addQuestion(ctx.request.body.question, {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        deploymentType: deployment,
        logger: rollbar
    })

    ctx.body = result
}