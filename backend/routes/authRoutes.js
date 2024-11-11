import express from "express";
import authController from "../controllers/authController.js";
import registerController from "../controllers/registerController.js";

const authRoutes = express.Router();

// Endpoint para autenticação
authRoutes.post("/api/auth", authController);

// Endpoint para registro
authRoutes.use("/api/auth/register", registerController);

export default authRoutes;
