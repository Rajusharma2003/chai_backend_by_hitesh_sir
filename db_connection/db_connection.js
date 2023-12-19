import { mongoose } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectionDB = async function () {

    try {
    const connection  = await mongoose.connect(`${process.env.DB_URL} / ${DB_NAME} , `)
        
    console.log(`MongoDB conntion successfully !! ${connection.connection.host}`);
    } catch (error) {
       
        console.log(`MongoDBB connection is unsuccessfully ${error}`);
        process.exit(1)
        
        
    }
}

export default connectionDB