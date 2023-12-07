import { Router } from "express";
import { fetchProducts } from "../controller/fetchProducts";
// import { generateInvoice } from "../controllers/generateInvoice";
const router = Router()


router.get("/products",fetchProducts)
// router.post("/invoice",generateInvoice)


export default router