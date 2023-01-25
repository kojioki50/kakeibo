import express from "express";
import productRoutes from "./lists.mjs";

const apiRoutes = express.Router();
apiRoutes.use("/lists", productRoutes);

export default apiRoutes;