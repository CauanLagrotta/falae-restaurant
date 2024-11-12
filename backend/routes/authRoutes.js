import express from "express";
import authController from "../controllers/authController.js";
import registerController from "../controllers/registerController.js";
import forgotPasswordController from "../controllers/forgotpasswordController.js";
import resetPasswordController from "../controllers/resetpasswordController.js";

const authRoutes = express.Router();

// Endpoint para autenticação
authRoutes.use("/api/auth", authController);

// Endpoint para registro
authRoutes.use("/api/auth/register", registerController);

// Endpoint para reset de senha
authRoutes.use("/api/auth", forgotPasswordController);
authRoutes.use("/api/auth", resetPasswordController);

export default authRoutes;
