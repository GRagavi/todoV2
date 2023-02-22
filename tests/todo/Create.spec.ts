import {expect} from '@playwright/test'
import {test} from '../../fixtures/User.fixture'

import { INVALIDCODE, INVALIDDATA, JSONPARSEError, STATUS, SUCCESSCODE, TODOTITLE, UNDEFINED, URL } from './Const'

test.describe("Create Todo_PositiveCases",()=>{

    test(TODOTITLE.CREATE_TODO_WITHOUT_STATUS,async({authenticatedRequest},testInfo)=>{
        const postResp = await authenticatedRequest.post(URL,{title:testInfo.title})
        const body = await postResp.json()
        expect(body.title).toBe(testInfo.title)
        expect(postResp.status()).toBe(201)
        const getResp = await authenticatedRequest.get(URL)
        console.log(await getResp.json())
        testInfo['id'] = body.id
        
     })
     test(TODOTITLE.CREATE_TODO_WITH_STATUS,async({authenticatedRequest},testInfo)=>{
          const postResp = await authenticatedRequest.post(URL,{title:testInfo.title,status:STATUS[0]})
          const body = await postResp.json()
          expect(body.title).toBe(testInfo.title)
          expect(postResp.status()).toBe(201)
          const getResp = await authenticatedRequest.get(URL)
          console.log(await getResp.json())
          testInfo['id'] = body.id
          
      })

      test.afterEach(async({authenticatedRequest},testInfo)=>{
            const id = testInfo['id']
            const deleteResp = await authenticatedRequest.delete(`/v2/todo/${id}`)
            expect(deleteResp.status()).toBe(SUCCESSCODE)
        })
})


test.describe("create_NegativeCases",()=>{
    test(TODOTITLE.CREATE_TODO_WITHOUT_TITLE,async({authenticatedRequest},testInfo)=>{
        const postResp = await authenticatedRequest.post(URL,{status:STATUS[0]})
        const body = await postResp.json()
        testInfo['id'] = body.id
         expect(postResp.status()).toBe(INVALIDCODE)
         expect(body.id).toBe(UNDEFINED)
         expect(body.title).toBe(UNDEFINED)
         expect(body.status).toBe(UNDEFINED)
         const getResp = await authenticatedRequest.get(URL)
         console.log(await getResp.json())    
     })
    
     test(TODOTITLE.CREATE_TODO_WITH_INVALID_STATUS,async({authenticatedRequest},testInfo)=>{
        const postResp = await authenticatedRequest.post(URL,INVALIDDATA)
        const body = await postResp.json()
         expect(postResp.status()).toBe(INVALIDCODE)
         expect(body.id).toBe(UNDEFINED)
         const getResp = await authenticatedRequest.get(URL)
         console.log(await getResp.json())
         testInfo['id'] = body.id
     })

})





    