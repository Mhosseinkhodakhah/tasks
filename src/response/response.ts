import { responseInterface } from "src/task/interfaces/response.interface"

export class Respons {

    constructor( req : any , res : any , statusCode : number , scope : string , error : string | {} , data : string | object | any[]){
        const payload : responseInterface = {
            success : (statusCode == 200) ? true : false,
            scope : scope,
            error : error,
            data : data
        }
        return res.status(statusCode).json(payload)
    }

}
