import { APIRequestContext } from "playwright-core";

export async function createUser(request: APIRequestContext, body:{username:string,password:string}){
    const resp = await request.post('/v2/user',{
        data: body,
        headers:{
            'Content-Type':'application/json'
        }
    })
    return {status: resp.status(),body:await resp.json()}
}