 import { User } from "../models/user.model.js";
import  asyncHandler from "../utils/asyncHandler.js"
 import ApiError from "../utils/errorAPI.js"


//  This is for user registration controller.
 const registerUser = asyncHandler(  async (req , res) => {

  // 0. basic
   //  res.status(200).json({
   //      message : "chai or code"
   //  })

  //  1. send request from frontend.
    const { username, email, password, fullname} = req.body 
    console.log("email : " , email);  // if you set you limit inside the app.js file => they throw error "entryIsToLong"



  // 2. check velidation 
  // if (![username, email, password, fullname].every(field => field?.trim() !== "")) {
  //   throw new ApiError(400, "All fields are required");
  // }  // you can also check with every
  
    if([username, email, password, fullname].some( (fields) => fields?.trim() === "")){
      throw new ApiError( "400" , "All fields is required")
    }

      // Regular expression for basic email validation
     const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

     // Check if the email matches the pattern
     if (pattern.test(email)) {
        res.json({ isValid: true, message: 'Valid email address' });
    } else {
       throw new ApiError( "400" , "Invalid email address pls enter the valid email")
    }



    // 3. check user is already exist or not.
    const existedUser = User.findOne({
                        $or : [ { username } , { email }] //"method" check inside the db is (username) and (email) is already exist or not
                             })

       if (existedUser) {
        throw new ApiError(  "409" , "user with email or username is already exist")
       }                          







})







 export
  {
    registerUser
 }
 