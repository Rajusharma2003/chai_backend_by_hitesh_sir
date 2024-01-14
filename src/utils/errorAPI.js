class ApiError extends Error {

    constructor(
        message = 'something went wrong',
        statusCode,
        errors = [],
        stack
    ){

        super(message)
        this.statusCode = statusCode,
        this.message = message,
        this.data = null,
        this.status = false
        this.errors = errors


        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}


export default ApiError