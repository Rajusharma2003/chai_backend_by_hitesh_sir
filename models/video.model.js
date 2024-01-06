// this is a video Schema.

import  Mongoose , { Schema}  from "mongoose"
import mongooseAggregatePaginate from "mongoose-paginate-v2"
const videoSchema = new Schema(
    {
        videoFile : {
            type : String,   // cloudnary url
            required : [true , 'videoFile is required']
        },

        thumbnail :  {
            type : String,   // cloudnary url
            required : [true , 'thumbnail is required']
        },

        title : {
            type : String,   
            required : [true , 'title is required']
        },

        description : {
            type : String,   
            required : [true , 'description is required']
        },

        duration : {
            type : Number,   // cloudnary url
            required : [true , 'duration is required']
        },

        views : {
            type : Number,
            default : 0
        },

        ispublished : {
           type : Boolean,
           default : true
        },

        owner : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }

        
    },{
        timestamps : true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)


export const Video = Mongoose.model('Video' , videoSchema)