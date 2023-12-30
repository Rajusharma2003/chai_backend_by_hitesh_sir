import { app } from "./app";
import connectionDB from "./db_connection/db_connection";
import dotenv from "dotenv"


dotenv.config({
    path : "./env"
})



connectionDB()

// MongoDB proper connections.
.then( () => {
    app.listen( Process.env.PORT || 4001 , () =>{
          console.log(`server is running on PORT no ${process.env.PORT}`);
    })
})
.catch( (e) =>{
    console.log(`database is not connected successfully ${e}`);
})