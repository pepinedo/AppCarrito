import express from "express";
import usersControllers from "./users.controller.js";

const router = express.Router();

router.get("/all", usersControllers.getAllUsers);


export default router;

