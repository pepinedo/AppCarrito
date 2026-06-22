import express from "express"
import plateControllers from "./plate.controller.js"

const router = express.Router()

router.get("/all/:cartId", plateControllers.byCartId)
router.get("/one/:plateId", plateControllers.getPlateById)
router.get("/ingredients/:plateId", plateControllers.getIngredientsByPlateId)
router.post("/create", plateControllers.createPlate)
router.post("/addIngredient", plateControllers.addIngredientToPlate)
router.post("/removeIngredient", plateControllers.removeIngredientFromPlate)
router.post("/selectAllIngredients", plateControllers.selectAllIngredients)

export default router

