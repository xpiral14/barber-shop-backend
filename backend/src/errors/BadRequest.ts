import { BAD_REQUEST } from "../constants/HttpStatusCod"


export default class BadRequest extends Error {
    private status : number;
    constructor(message?:string){
        super(message)
        this.status = BAD_REQUEST;
        
    }
}