
// Define the user schema.
import  Mongoose, {Schema}  from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
      username : {
        type : String,
        required : [true , 'username is required'],
        trim : true,
        unique : true,
        lowercase : true,
        index : true
      },
        email: {
        type : String,
        required : [true , 'email is required'],
        trim : true,
        unique : true,
        lowercase : true,
      }, 
      
      fullname : {
        type : String,
        required : [true , 'fullname is required'],
        trim : true,
        index : true
      },

      avatar : {
        type : String,
        required : [true, "avatar is required"]
      },

      coverimage : {
        type : String   //cloudnary url
      },

      watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Video'
        }
      ],

      password : {   // using bycrypt
        type : String,
        required : [true , 'password is required']
      },

      refreshToke : {
        type : String
      }
    } , {
        timestamps  : true
    }
)


// Hookes and middlewares for incrypted password.
userSchema.pre('save' , async function (next){
   if(!this.isModified("password")) return next()  // if only password is Modified so they can be sava otherwise not
 
    this.password = bcrypt.hash(this.password , 10)
})

// This is a method for campare the bcrypt password.
userSchema.methods.isPasswordCorrect = async function () {
     return await bcrypt.compare(password , this.password)

}


// This is for create JWT Token.
userSchema.methods.generateAccessToken = function () {

    jwt.sign(
        {
            _id : this._id,
            email : this.email,
            fullname : this.fullname,
            username : this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


// This is for create refresh token
userSchema.methods.generateRefreshToken = function () {

    jwt.sign(
        {
            _id : this._id,
            email : this.email,
            fullname : this.fullname,
            username : this.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


// This is a export statement.
export const User = Mongoose.model( 'User' , userSchema)   