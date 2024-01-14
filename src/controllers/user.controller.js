import { youUser } from "../models/user.model.js";
import  asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/errorAPI.js"
import uplodeOnCloudinary from "../utils/cloudinary.js"
import ApiResponse from "../utils/ApiResponce.js";


 
//  This is for user registration controller.
 const registerUser = asyncHandler(  async (req , res) => {

  // THESE ARE THE STEPS FOR DURING THE USER REGISTRATION.

  // Get user info from frontend.
  //validation - check
  //check if user is already exist or not inside the db.
  //check for image and check for avatar.
  //upload on cloudinary , avatar.
  //create user object , create entry inside the db.
  //remove password and refreshtoken from the user details.
  // check for user creation 
  // return res



  // 0. basic
   //  res.status(200).json({
   //      message : "chai or code"
   //  })

  //  1. send request from frontend.
    const { username, email, password, fullname} = req.body 
    // console.log("email : " , email);  // if you set you limit inside the app.js file => they throw error "entryIsToLong"



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
     if (!pattern.test(email)) {
      throw new ApiError( 400 , "Invalid email address pls enter the valid email")
    }



    // 3. check user is already exist or not.
    const existedUser = await youUser.findOne({
                        $or : [ { username } , { email }] //"method" check inside the db is (username) and (email) is already exist or not
                         })

       if (existedUser) {
            throw new ApiError(  409 , "user with email or username is already exist")
       }                          

// past
console.log(req.files);
const avatarLocalPath = req.files?.avatar?.[0]?.path;

let coverImageLocalPath;
if (req.files && req.files.coverImage && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path;
}

// create a condition for checking if "avatarLocalPath" is available or not.
if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is not available in the local path");
}

// 4. upload on cloudinary
const avatar = await uplodeOnCloudinary(avatarLocalPath);

// check if the avatar upload failed
if (!avatar) {
    throw new ApiError(400, "Error uploading avatar to Cloudinary");
}

// 4. upload cover image on cloudinary if available
let coverImage;
if (coverImageLocalPath) {
    coverImage = await uplodeOnCloudinary(coverImageLocalPath);

    // check if the cover image upload failed
    if (!coverImage) {
        throw new ApiError(400, "Error uploading cover image to Cloudinary");
    }
}


  // 5. create user object and create inside the database.
const user = await youUser.create({
    username : username.toLowerCase(),
    email,
    password,
    fullname,
    avatar : avatar.url,
    coverImage: coverImage?.url || ""

  })

  //6. user _id find inside the db and remove with the help of ".select" method (password and refreshToken).
  const createdUser = await youUser.findById(user._id).select( "-password -refreshToken" )
  
  //  condition for check createdUser is created or not.
   if (!createdUser) {
    throw new ApiError(500 , "something went wrong while user is creating")
   }

// 7. This is a ApiResponce import from the "utils" file. send a good request.
   return res.status(201).json(
      new ApiResponse( 200 , createdUser , "user created successfully")
   )




})


 export
  {
    registerUser
 }
 

