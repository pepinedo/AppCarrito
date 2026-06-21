import express from "express"
import ingredientController from "./ingredient.controller.js"

const router = express.Router()

router.post("/create", ingredientController.create)
router.post("/toggle", ingredientController.toggle)

export default router