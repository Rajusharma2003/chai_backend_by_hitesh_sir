import { app } from "./app.js";
import connectionDB from "./db_connection/db_connection.js";
import dotenv from "dotenv";


dotenv.config({
    path : "./env"
})


// excuction connectionDB function.
connectionDB()

// MongoDB proper connections.
.then( () => {
    app.listen( process.env.PORT || 4001 , () =>{
          console.log(`server is running on PORT no ${process.env.PORT}`);
    })
})
.catch( (e) =>{
    console.log(`database is not connected successfully ${e}`);
})    