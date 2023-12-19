import { Router } from "express";
import { fetchProducts } from "../controllers/fetchProducts";
import { generateInvoice } from "../controllers/generateInvoice";

let router = Router()


router.get("/products", fetchProducts)
 router.post("/invoice",generateInvoice)


export default router