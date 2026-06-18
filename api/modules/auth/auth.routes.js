import express from "express"
import authControllers from "./auth.controller.js"

const router = express.Router()

router.post("/login", authControllers.login)
router.post("/register", authControllers.register)


export default router

