import express from "express"
import { deleteUser, getUser } from "../controllers/user.controller.js"
import { verifyToken } from "../middlewares/jwt.js"
const router = express.Router()


// router.get("/register", fn)
// router.get("/test/:id", fn)
router.delete("/:id", verifyToken, deleteUser)
router.get("/:id", getUser)
router.get("/what/:id", getUser)

export default router

