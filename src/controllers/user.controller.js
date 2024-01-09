 import  asyncHandler from "../utils/asyncHandler.js"


//  This is for user registration controller.
 const registerUser = asyncHandler(  async (req , res) => {
    res.status(200).json({
        message : "ok"
    })
 })



 export {registerUser,
user}
 