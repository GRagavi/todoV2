import {test as base,request,expect} from '@playwright/test';
//import { createUser,deleteUser } from '../util/user';
import { AuthenticatedRequest } from './AuthenticatedRequest'
import { randomUUID } from 'crypto';

export const test = base.extend<{authenticatedRequest:AuthenticatedRequest}>({
    // authenticatedRequest: async ({request},use)=>{
    //     const unique = randomUUID();
    //     createUser(authenticatedRequest,{username:unique,password:unique})
    //     console.log("User Created")
    //     const authreq = new AuthenticatedRequest(request,unique,unique);
    //     use(authreq)
    //     // await deleteUser(authreq)
    //     // console.log("User deleted")
    // }

    authenticatedRequest:async({request},use)=>{
        const ar = new AuthenticatedRequest(request,"Ragavi","Password")
        ar.createUser("/v2/user")
        console.log("User Created")
        use(ar)
    }
})