import {test as base,expect} from '@playwright/test'
import { createUser } from '../util/user';
import { AuthenticatedRequest } from './AuthenticatedRequest'
import { randomUUID } from 'crypto';
export const test = base.extend<{authenticatedRequest:AuthenticatedRequest}>({
    authenticatedRequest: async ({request},use)=>{
        const unique = randomUUID();
        console.log('Creation steps here')
        const {status} = await createUser(request,{username:unique,password:unique})
        expect(status).toBe(201)
        const ar = new AuthenticatedRequest(request,unique,unique);
        use(ar)
        console.log('Deletion steps here')
    }
})