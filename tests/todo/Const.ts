export const TODOTITLE = {
    CREATE_TODO_WITHOUT_STATUS:"Creation of todo should work without passing status field",
    CREATE_TODO_WITH_STATUS:"Creation of todo should work when passed status field",
    CREATE_TODO_WITHOUT_TITLE:"Creation of Todo should give 400 when title field is not passed",
    CREATE_TODO_WITH_INVALID_STATUS:"Creation of Todo should give 400 when status value is not either ACTIVE or DONE",
    DELETETODO:"Deletion of todo should work if todo exists",

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
    UPDATE_INVALID_ID_PUT:"Updation of non existing todo should give 400 via put endpoint"

export type RESPONSEBODY = [
    {id: number,
    title: string,
    status: string,
}]
export const NULL = null
export const UNDEFINED = undefined
export const INVALIDDATA = {title:"Wrong tile",status: "status"}
export const STATUS = ["ACTIVE","DONE"]
export const SUCCESSCODE = 200
export const CREATEDENTRY = 201
export const INVALIDCODE = 400
export const NOTFOUND = 404
export const JSONPARSEError ="JSON parse error: Cannot deserialize value of type `com.sedintechnologies.qa.todoapi.v1.models.TodoStatus` from String \"status\": not one of the values accepted for Enum class: [DONE, ACTIVE]"
export const URL = '/v2/todo'
