import {expect,request} from "@playwright/test"
import { test } from "../fixtures/User.fixture"
import { NOTFOUND, NULL, RESPONSEBODY, STATUS, SUCCESSCODE, TODOTITLE, URL, UNAUTHORIZED, CREATEDENTRY} from "./Const"
import { AuthenticatedRequest, getHash } from "../fixtures/AuthenticatedRequest"
import { post } from "cypress/types/jquery"
import {randomUUID} from 'crypto'


test(TODOTITLE.GET_ALL_CREATED_TODOS, async ({ authenticatedRequest },testInfo) => {
  const createdTodos:RESPONSEBODY[] = testInfo['todos']
  const getResp = await authenticatedRequest.getAll(URL)
  expect(getResp.status()).toBe(200)
  const body = await getResp.json()
  expect(body).not.toBe(null)
  console.log(getResp)
})

//************************************** */

test.describe("Get Recently Created Todos should work",()=>{

    test.beforeEach(async({authenticatedRequest},testInfo)=>{
        let count =3
        let a:number[]=[]
        let ID:number[]=[]
        let body:any[]=[]
        while(count>0){
            const postResp = await authenticatedRequest.post(URL,{title:`testInfo.title${count}`,status:STATUS[0]})
            const Response = await postResp.json()
            body.push(Response)
            a.push(Response.id)
            count--
        }
        testInfo['ID']= a
        testInfo['Body']=body
        console.log(a)
    })
    test(TODOTITLE.GET_EXISTING_TODOS,async({authenticatedRequest},testInfo)=>{
            let Body:any[] = testInfo['Body']
            console.log(Body)
            console.log("get all")
            const getResponse = await authenticatedRequest.getAll(URL)
            const body = await getResponse.json()
            for (const CapturedBody of Body) {
              const createdID = body.find(capturedbody => capturedbody.id==CapturedBody.id)
              console.log(createdID)
              expect(createdID?.id).toBe(CapturedBody.id)
              expect(createdID?.title).toBe(CapturedBody.title)
            };
            expect(body).not.toBe(NULL)
            expect(getResponse.status()).toBe(SUCCESSCODE)
    
    })

    test.afterEach(async({authenticatedRequest},testInfo)=>{
      let a:number[]=[]
     
      let ID:number[]=testInfo['ID']
      console.log('Inside After Each')
      console.log(ID)
      for(let id of ID){
            const postResp = await authenticatedRequest.delete(`${URL}/${id}`)
            console.log(postResp)
        }
    })
  })
//************************************* */


test(TODOTITLE.GET_NONEXISTING_TODOS,async({authenticatedRequest},testInfo)=>{
  const id = 0
  const getResp = await authenticatedRequest.get(`URL/${id}`)
  expect(await getResp.json).not.toBe(NULL)
  expect(getResp.status()).toBe(NOTFOUND)
})

//*************************************** */



  test.describe(TODOTITLE.GET_TODO_WITHOUT_AUTHORIZATION,()=>{
    test.beforeEach(async ({authenticatedRequest,request},testInfo)=>{
      const postResponse = await authenticatedRequest.post(URL,{title:testInfo.title,status:STATUS[0]})
      const body = await postResponse.json()
      testInfo['id'] = body.id
      expect(postResponse.status()).toBe(CREATEDENTRY)
    })
    test(TODOTITLE.GET_TODO_WITHOUT_AUTHORIZATION,async ({request},testInfo)=>{
      let id = (testInfo['id'])
      const getResp = await request.get(`${URL}/${id}`)
      expect(getResp.status()).toBe(UNAUTHORIZED)
    })
    test.afterEach(async ({authenticatedRequest},testInfo)=>{
      let id = testInfo['id']
      const deleteResp = await authenticatedRequest.delete(`${URL}/${id}`)
      expect(deleteResp.status()).toBe(SUCCESSCODE)
    })
  })
  

  //************************/
  test.describe(TODOTITLE.GET_TODO_OF_ONEUSER_BY_ANOTHERUSER,()=>{
    test.beforeEach(async ({authenticatedRequest,request},testInfo)=>{
      const postResponse = await authenticatedRequest.post(URL,{title:testInfo.title,status:STATUS[0]})
      const body = await postResponse.json()
      testInfo['id'] = body.id
      expect(postResponse.status()).toBe(CREATEDENTRY)
      const unique = randomUUID()
      const newUser = await request.post('/v2/user',{
           data:{
                  username:unique,
                  password:unique
                }
              
      })
      expect(newUser.status()).toBe(CREATEDENTRY)
      testInfo['unique'] = unique
    })
    test(TODOTITLE.GET_TODO_OF_ONEUSER_BY_ANOTHERUSER,async ({request},testInfo)=>{
     const getResp = await request.get(`${URL}/${testInfo['id']}`,{
        headers:{
          'Authorization': `Basic ${getHash(testInfo['unique'],testInfo['unique'])}`
        }})
      expect(getResp.status()).toBe(NOTFOUND)
    })
    test.afterEach(async ({request,authenticatedRequest},testInfo)=>{
      const deleteMeObj = new AuthenticatedRequest(request,testInfo['unique'],testInfo['unique'])
      const deleteUserResp = await deleteMeObj.deleteMe()
      expect(deleteUserResp.status()).toBe(SUCCESSCODE)
      let id = testInfo['id']
      const deleteResp = await authenticatedRequest.delete(`${URL}/${id}`)
      expect(deleteResp.status()).toBe(SUCCESSCODE)
    })
  })

  //******************** */

  test.describe("Getting all Todo should not work if Authentication Details are not passed",()=>{

    test.beforeEach(async({authenticatedRequest},testInfo)=>{
        let count =3
        let a:number[]=[]
        let ID:number[]=[]
        let body:any[]=[]
        while(count>0){
            const postResp = await authenticatedRequest.post(URL,{title:`testInfo.title${count}`,status:STATUS[0]})
            const Response = await postResp.json()
            body.push(Response)
            a.push(Response.id)
            count--
        }
        testInfo['ID']= a
    })
    test(TODOTITLE.GETALL_WITHOUT_AUTHORIZATION,async({request},testInfo)=>{
            let Body:any[] = testInfo['Body']
            console.log(Body)
            console.log("get all")
            const getResponse = await request.get(URL,{
              headers:{
                'Content-Type' : 'Application/json'
              }
            })
            expect(getResponse.status()).toBe(UNAUTHORIZED)
    
    })
    test.afterEach(async({authenticatedRequest},testInfo)=>{
      let a:number[]=[]
     
      let ID:number[]=testInfo['ID']
      console.log('Inside After Each')
      console.log(ID)
      for(let id of ID){
            const postResp = await authenticatedRequest.delete(`${URL}/${id}`)
            console.log(postResp)
        }
    })
  })
