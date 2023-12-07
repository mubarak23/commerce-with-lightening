import { PurchaseRequest } from '../interface/PurchaseRequest';
import { getProductNames } from "./productName";
export const getInvoiceComment = (payload: PurchaseRequest) => {
    return `Purchase pf ${getProductNames(payload.products)} by ${payload.name}, Email: ${payload.email}, Delivery Address: ${payload.address}`
}