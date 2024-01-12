import { User } from "../models/user.model.js";
import  asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/errorAPI.js"
import uplodeOnCloudinary from "../utils/cloudinary.js"
 
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
      throw new ApiError( 400 , "All fields is required")
    }

      // Regular expression for basic email validation
     const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

     // Check if the email matches the pattern
     if (pattern.test(email)) {
        res.json({ isValid: true, message: 'Valid email address' });
    } else {
       throw new ApiError( 400 , "Invalid email address pls enter the valid email")
    }



    // 3. check user is already exist or not.
    const existedUser = await User.findOne({
                        $or : [ { username } , { email }] //"method" check inside the db is (username) and (email) is already exist or not
                             })

       if (existedUser) {
        throw new ApiError(  409 , "user with email or username is already exist")
       }                          


// check for image and avatar.

   const avatarLoalPath = req.files?.avatar[0]?.path;  // file path from local server , (?) => this is a chaining
   const coverImagePath = req.files?.coverImage[0]?.path; // file path from local server.

  //  create a condition for check "avatarLoacalPath" is avaliable or not.
  if (!avatarLoalPath) {
    throw new ApiError(400 , "avatar is not avaliable") 
  }

// 4. upload on cloudinary 

   const avatar =  await uplodeOnCloudinary(avatarLoalPath)
   const coverImage = await uplodeOnCloudinary(coverImagePath)

  //  condition to check
  if (!avatar) {
    throw new ApiError(400 , "avatar is not avaliable")
  }

  // 5. create user object and create inside the database.
const user = await User.create({
    username : username.toLowerCase(),
    email,
    password,
    fullname,
    avatar : avatar.url,
    coverimage : coverImage.url

  })

  const createdUser = await User.findById(user._id).select( "-password -refreshToken" )
  
  //  condition for check createdUser is created or not.
   if (!createdUser) {
    throw new ApiError(500 , "something went wrong while user is creating")
   }







})


 export
  {
    registerUser
 }
 