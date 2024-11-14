import express from "express";
import productController from "../controllers/productController.js";

const productRoutes = express.Router();

productRoutes.use("/api", productController);

export default productRoutes;