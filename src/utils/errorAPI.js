class ApiError extends Error {

    constructor(
        message = 'something went wrong',
        statusCode,
        errors = [],
        stacks
    ){

        super(message)
        this.statusCode = statusCode,
        this.message = message,
        this.data = null,
        this.status = false
        this.errors = errors


        if(stacks){
            this.stack = stacks
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}


export{ApiError}