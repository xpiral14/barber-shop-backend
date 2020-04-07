import { BAD_REQUEST } from "../constants/HttpErrors"


export default class BadRequest extends Error {

    constructor(message){
        super(message)
        this.status = BAD_REQUEST;
        
    }
}