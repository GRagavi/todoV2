import { test } from "../../fixtures/User.fixture";

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
    test("Updating only title of todo via patch endpoint should work",async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id']
        const resp = await authenticatedRequest.patch(`/v2/todo/${Id}`,{title:'updated by GR'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(200)
    })
    
    test("Updating only status of todo via patch endpoint should work",async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id']
        const resp = await authenticatedRequest.patch(`/v2/todo/${Id}`,{status:'ACTIVE'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(200)
    })
    test("Updation of status todo should give 400 when status is not either of ACTIVE or DONE",async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id'] 
        const resp = await authenticatedRequest.patch(`/v2/todo/${Id}`,{status:'updated by GR'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(400)
    })
    test("Updating both title and status of todo via patch endpoint should work",async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id']
        const resp = await authenticatedRequest.patch(`/v2/todo/${Id}`,{title:'updated by GR',status:'ACTIVE'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(200)
    })
    test("Updation of both title and status of todo should give 400 when status is not either of ACTIVE or DONE in patch",async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id']
        const resp = await authenticatedRequest.patch(`/v2/todo/${Id}`,{title:'updated by GR',status:'test'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(400)
    })
    
    test("Updation of both status and title should work via put endpoint",async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id']
        const resp = await authenticatedRequest.put(`/v2/todo/${Id}`,{title:'updated by GR with put endpoint',status:'ACTIVE'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(200)
    })
    
    test("Updation of both status and title should give 400 when status is not either of ACTIVE or DONE via put endpoint",async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id']
        const resp = await authenticatedRequest.put(`/v2/todo/${Id}`,{title:'updated both status and title by GR with put endpoint',status:'test'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(400)
    })
    
    test("Updation of only title should give 400 via put endpoint",async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id']
        const resp = await authenticatedRequest.put(`/v2/todo/${Id}`,{title:'updated tile only by GR with put endpoint'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(400)
    })
    
    test("Updation of only status should give 400 via put endpoint",async ({authenticatedRequest},testInfo)=>{
        const Id = testInfo['id']
        const resp = await authenticatedRequest.put(`/v2/todo/${Id}`,{status:'test'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(400)
    })
    
    test("Updation of non existing todo should give 400 via put endpoint",async ({authenticatedRequest},testInfo)=>{
        const Id = 0
        const resp = await authenticatedRequest.put(`/v2/todo/${Id}`,{title:'updated status only by GR with put endpoint',status:'Active'})
        console.log(await resp.json())
        test.expect(resp.status()).toBe(400)
    })
    
    test("Updation of non existing todo should give 404 via patch endpoint",async ({authenticatedRequest},testInfo)=>{
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
