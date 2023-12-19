import connectionDB from "./db_connection/db_connection";

import dotenv from "dotenv"


dotenv.config({
    path : "./env"
})



connectionDB()