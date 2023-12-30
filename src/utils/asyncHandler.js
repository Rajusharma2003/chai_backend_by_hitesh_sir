// This is for promise method.
const aysncHandler = () =>{
    (req , res , next) => {
         Promise.resolve( aysncHandler( req , res , next))
         .catch( (err) => next(err))
    }
}




export {aysncHandler}



// This is for try and catch method
// const aysncHandler = (fn) => async (res , req , next) => {

    try {
         await fn( res , req ,next) 
    } catch (err) {
        res.status(err.code || 500).json({
            success : false,
            message : err.message
        })
    }
// }
