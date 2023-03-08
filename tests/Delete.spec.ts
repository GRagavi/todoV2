import { expect } from "@playwright/test"
import { AuthenticatedRequest,getHash } from "../fixtures/AuthenticatedRequest"
import {test} from '../fixtures/User.fixture'
import { INVALIDCODE, NOTFOUND, STATUS, SUCCESSCODE, TODOTITLE, UNAUTHORIZED, URL } from "./Const"
import { request } from "http"
import { randomUUID } from "crypto"


test.describe("Deletion of todo should work if todo exists",async()=>{
    test.beforeEach(async({authenticatedRequest},testInfo)=>{
            const postResp = await authenticatedRequest.post(URL,{title:'Delete Todo data',status:STATUS[0]})
            const status = postResp.status()
            const body = await postResp.json()
            expect(status).toBe(201)
            testInfo['id'] = body.id
    })
    test("Delete created Id",async ({authenticatedRequest},testInfo)=>{
        const id = testInfo['id']
        const deleteResp =  await authenticatedRequest.delete(`${URL}/${id}`)
        expect(deleteResp.status()).toBe(SUCCESSCODE)
    })
})



test(TODOTITLE.DELETETODO_SHOULDGIVE_400_VIAPUT_ENDPOINT,async ({authenticatedRequest},testInfo)=>{
        const id = testInfo['id']
        const deleteResp =  await authenticatedRequest.put(`${URL}/${id}`,{
            data:{
                title:"Delete Using Put Endpoint"
            }
        })
        expect(deleteResp.status()).toBe(INVALIDCODE)
})

test(TODOTITLE.DELETETODO_WITHOUT_AUTH_SHOULDNTWORK,async ({authenticatedRequest,request},testInfo)=>{
    const id = testInfo['id']
    const deleteResp =  await request.delete(`${URL}/${id}`)
    expect(deleteResp.status()).toBe(UNAUTHORIZED)
})

test(TODOTITLE.DELETETODO_ONEUSER_BY_ANOTHERUSER,async ({authenticatedRequest,request},testInfo)=>{
    const id = testInfo['id']
    const unique = randomUUID()
    const deleteResp =  await request.delete(`${URL}/${id}`,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Basic ${getHash(unique,unique)}`
        }
    })
    expect(deleteResp.status()).toBe(UNAUTHORIZED)
})