import express from "express"
import usersControllers from "./users.controller.js"

const router = express.Router()

router.get("/all", usersControllers.getAllUsers)
router.get("/one/:userId", usersControllers.getUserById)


export default router

