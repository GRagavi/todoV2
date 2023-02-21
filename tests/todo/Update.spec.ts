import { test } from "../../fixtures/User.fixture";
import { TODOTITLE } from "./Const";
import { expect } from "@playwright/test";

test.describe("Update TestCases",()=>{

    test.beforeEach(async ({authenticatedRequest},testInfo)=>{
        const respons = await authenticatedRequest.post('/v2/todo',{
            title :'create request by GR',
            status:'ACTIVE'
        })
        test.expect(respons.status()).toBe(201)
        console.log("ID Created")
        const Response = await respons.json()
        testInfo['id'] = Response.id
    })
    test(TODOTITLE.UPDATE_TITLE_WITH_PATCH,async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id']
        const resp = await authenticatedRequest.patch(`/v2/todo/${Id}`,{title:'updated by GR'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(200)
    })
    
    test(TODOTITLE.UPDATE_ONLYSTATUS_WITH_PATCH,async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id']
        const resp = await authenticatedRequest.patch(`/v2/todo/${Id}`,{status:'ACTIVE'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(200)
    })
    test(TODOTITLE.UPDATE_INVALIDSTATUS_WITH_PATCH,async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id'] 
        const resp = await authenticatedRequest.patch(`/v2/todo/${Id}`,{status:'updated by GR'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(400)
    })
    test(TODOTITLE.UPDATE_TITLE_STATUS_WITH_PATCH,async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id']
        const resp = await authenticatedRequest.patch(`/v2/todo/${Id}`,{title:'updated by GR',status:'ACTIVE'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(200)
    })
    test(TODOTITLE.UPDATE_TITLE_INAVLIDSTATUS_WITH_PATCH,async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id']
        const resp = await authenticatedRequest.patch(`/v2/todo/${Id}`,{title:'updated by GR',status:'test'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(400)
    })
    
    test(TODOTITLE.UPDATE_TITLE_STATUS_WITH_PUT,async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id']
        const resp = await authenticatedRequest.put(`/v2/todo/${Id}`,{title:'updated by GR with put endpoint',status:'ACTIVE'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(200)
    })
    
    test(TODOTITLE.UPDATE_TITLE_INAVLIDSTATUS_WITH_PUT,async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id']
        const resp = await authenticatedRequest.put(`/v2/todo/${Id}`,{title:'updated both status and title by GR with put endpoint',status:'test'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(400)
    })
    
    test(TODOTITLE.UPDATE_TITLE_WITH_PUT,async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id']
        const resp = await authenticatedRequest.put(`/v2/todo/${Id}`,{title:'updated tile only by GR with put endpoint'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(400)
    })
    
    test(TODOTITLE.UPDATE_ONLYSTATUS_WITH_PUT,async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id']
        const resp = await authenticatedRequest.put(`/v2/todo/${Id}`,{status:'test'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(400)
    })
    
    test(TODOTITLE.UPDATE_INVALID_ID_PUT,async ({authenticatedRequest},testInfo)=>{
        const Id = 0
        const resp = await authenticatedRequest.put(`/v2/todo/${Id}`,{title:'updated status only by GR with put endpoint',status:'Active'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(400)
    })
    
    test(TODOTITLE.UPDATE_INVALID_ID_PATCH,async ({authenticatedRequest},testInfo)=>{
        const Id = 0
        const resp = await authenticatedRequest.patch(`/v2/todo/${Id}`,{title:'updated status only by GR with put endpoint',status:'Active'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(400)
    })

    test.afterEach(async({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id']
        const resp = await authenticatedRequest.delete(`/v2/todo/${Id}`)
        test.expect(resp.status()).toBe(200)
        console.log("ID Deleted")
      
    })

})
