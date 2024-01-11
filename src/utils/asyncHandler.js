// This is for promise method.
const asyncHandler = (handler) => {
    // console.log("user is inside the asynchandler");
    return (req, res, next) => {
        Promise.resolve(handler(req, res, next))
            .catch((err) => next(err));
    };
};


export default asyncHandler;




// // This is for promise method.
// const aysncHandler = () =>{
//     return (req , res , next) => {
//          Promise.resolve( aysncHandler( req , res , next))
//          .catch( (err) => next(err))
//     }
// }


// export default aysncHandler ....error in this code




// This is for try and catch method
// const aysncHandler = (fn) => async (res , req , next) => {

    // try {
    //      await fn( res , req ,next) 
    // } catch (err) {
    //     res.status(err.code || 500).json({
    //         success : false,
    //         message : err.message
    //     })
    // }
// }
