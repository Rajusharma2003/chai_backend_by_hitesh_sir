import { Router } from "express";
import { registerUser, user } from "../controllers/user.controller.js";

const router  = Router()

// router.route("/register").post(registerUser)
router.post("/register" , registerUser)


export default router