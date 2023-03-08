export const TODOTITLE = {
    CREATE_TODO_WITHOUT_STATUS:"Creation of todo should work without passing status field",
    CREATE_TODO_WITH_STATUS:"Creation of todo should work when passed status field",
    CREATE_TODO_WITHOUT_TITLE:"Creation of Todo should give 400 when title field is not passed",
    CREATE_TODO_WITH_INVALID_STATUS:"Creation of Todo should give 400 when status value is not either ACTIVE or DONE",
    CREATE_TODO_WITH_UNAUTHORIZED_ACCESS:"Creation of Todo should give 401 without authorization",
    DELETETODO:"Deletion of todo should work if todo exists",
    DELETETODO_SHOULDWORK_IFEXISTS:"Deletion of todo should work if todo exists",
    DELETETODO_SHOULDGIVE_400_VIAPUT_ENDPOINT:"Deletion of non existing todo should give 404 via put endpoint",
    DELETETODO_WITHOUT_AUTH_SHOULDNTWORK:"Delete should not work without authorization details",
    DELETETODO_ONEUSER_BY_ANOTHERUSER:"Deletion of id of one user by Another user",
    GET_EXISTING_TODOS:"Get All Existing Todos",
    GET_NONEXISTING_TODOS:"Getting Non Existing Todos",
    GET_ALL_CREATED_TODOS:"Get All recently created Todos",
    GET_TODO_WITHOUT_AUTHORIZATION:"Get All recently created Todos without Authorization",
    GET_TODO_OF_ONEUSER_BY_ANOTHERUSER:"Get todo created by one user by another user",
    GETALL_WITHOUT_AUTHORIZATION:"Get All created todos when authentication details are not passed",
    UPDATE_TITLE_WITH_PATCH:"Updating only title of todo via patch endpoint should work",
    UPDATE_ONLYSTATUS_WITH_PATCH:"Updating only status of todo via patch endpoint should work",
    UPDATE_INVALIDSTATUS_WITH_PATCH:"Updation of status todo should give 400 when status is not either of ACTIVE or DONE",
    UPDATE_TITLE_STATUS_WITH_PATCH:"Updating both title and status of todo via patch endpoint should work",
    UPDATE_TITLE_INAVLIDSTATUS_WITH_PATCH:"Updation of both title and status of todo should give 400 when status is not either of ACTIVE or DONE in patch",
    UPDATE_TITLE_STATUS_WITH_PUT:"Updation of both status and title should work via put endpoint",
    UPDATE_TITLE_INAVLIDSTATUS_WITH_PUT:"Updation of both title and status of todo should give 400 when status is not either of ACTIVE or DONE in PUT",
    UPDATE_TITLE_WITH_PUT:"Updation of only title should give 400 via put endpoint",
    UPDATE_ONLYSTATUS_WITH_PUT:"Updation of only status should give 400 via put endpoint",
    UPDATE_INVALID_ID_PATCH:"Updation of non existing todo should give 404 via patch endpoint",
    UPDATE_INVALID_ID_PUT:"Updation of non existing todo should give 400 via put endpoint",
    UPDATE_WITHOUT_AUTHORIZATION_PATCH:"Updation of Todo Via Patch endpoint should not work if Authentication details are not passed",
    UPDATE_WITHOUT_AUTHORIZATION_PUT:"Updation of Todo Via Put endpoint should not work if Authentication details are not passed",
    UPDATE_ONE_BYANOTHER_PATCH:"One user shoul not be able to Patch other Users Todo",
    UPDATE_ONE_BYANOTHER_PUT:"One user shoul not be able to Put other Users Todo"
}
export type RESPONSEBODY = [
    {id: number,
    title: string,
    status: string,
    createdAt: string,
    updatedAt: string
}]
export const NULL = null
export const UNDEFINED = undefined
export const INVALIDDATA = {title:"Wrong tile",status: "status"}
export const STATUS = ["ACTIVE","DONE"]
export const SUCCESSCODE = 200
export const CREATEDENTRY = 201
export const INVALIDCODE = 400
export const NOTFOUND = 404
export const UNAUTHORIZED = 401
export const JSONPARSEError ="JSON parse error: Cannot deserialize value of type `com.sedintechnologies.qa.todoapi.v1.models.TodoStatus` from String \"status\": not one of the values accepted for Enum class: [DONE, ACTIVE]"
export const URL = '/v2/todo'
