import express from "express"
import cartController from "./cart.controller.js"

const router = express.Router()

router.post("/create", cartController.create)
router.get("/all-ingredients/:cartId", cartController.allIngredients)

export default router