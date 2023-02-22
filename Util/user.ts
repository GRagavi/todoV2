
// import { APIRequestContext } from "playwright-core";
// import { AuthenticatedRequest } from "../fixtures/AuthenticatedRequest";

// export async function createUser(authenticatedRequest:AuthenticatedRequest, body:{username:string,password:string}){
//     const resp = await authenticatedRequest.post('/v2/user',{
//         data: body,
//         headers:{
//             'Content-Type':'application/json'
//         }
//     })
//     return {status: resp.status(),body:await resp.json()}
// }

// export async function deleteUser(authenticatedRequest:AuthenticatedRequest){
//     const resp = await authenticatedRequest.delete('/v2/user')
//     return {status: resp.status()}