import { Router } from "express";
import { registerUser} from "../controllers/user.controller.js";
import {upload} from "../middleware/multer.middleware.js"

const router  = Router()

router.route("/register").post( upload.fields([
        {
            name : "avatar",
            maxCount : 1
        },
        {
            name : "converImage",
            maxCount : 1
        }
    ]),
    registerUser
    )
    
// router.post("/register" , registerUser)


export default router