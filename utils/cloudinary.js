import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'  //This is a file system (fs) study it from node.js
   

// past from cloudinay website.
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});


// uplode to cloudinary.

const uplodeOnCloudinary = async function (localFilePath){

    // console.log("cloudinary error");
    try {

    if(!localFilePath) return 'could not find the filePath'

     const response =  await cloudinary.uploader.upload(localFilePath, 
        {
        resource_type : "auto"
        }
    )
    // This is a successfully file Uplode message.
    console.log('file is Uploded successfully on Cloudinary' , response.url);

    // This is for client res
    return response


    } catch (error) {
        
        // In this catch raper we are using imported (fs)
        fs.unlinkSync(localFilePath) //remove the tempo saved file inside the public folder has been remove.

        return null
    }
}


export default uplodeOnCloudinary  

