import { Invoice } from "@getalby/lightning-tools";
import { Request, Response } from 'express';
import { io } from "../../app";
import { PurchaseRequest } from "../interface/PurchaseRequest";
import sendEmailNotification from "./email";

export const listenInvoice = async (
  req:Request,
  invoice: Invoice,
  res: Response
) => {
  try {
    const intervalId = setInterval(async () => {
      const paid = await invoice.isPaid();
      if (paid) {
        clearInterval(intervalId);
        io.emit("payment-verified", {
          message: "Payment verified successfully",
        });
        sendEmailNotification(req.body as PurchaseRequest,res)
      }
    }, 3000)
  } catch (error) {
    res.status(400).json({
      error: "Error occured while verifying payment",
    });
  }
}