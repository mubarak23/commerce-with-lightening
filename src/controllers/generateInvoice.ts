import { LightningAddress } from "@getalby/lightning-tools";
import { Request, Response } from "express";
import { listenInvoice } from "../helper/listenInvoice";
import { PurchaseRequest } from "../interface/PurchaseRequest";
import { getInvoiceComment } from "../utils/getInvoiceComment";
import { sumAmount } from "../utils/sumAmount";


// console.log('process.env.MERCHANT_LN_ADDRESS', process.env.MERCHANT_LN_ADDRESS)
if (!process.env.MERCHANT_LN_ADDRESS) {
  throw new Error(
    "Merchant's Lightning address environment variable is not defined"
  );
}

const ln = new LightningAddress(process.env.MERCHANT_LN_ADDRESS)

export const generateInvoice = async (req: Request, res: Response) => {
  console.log('ln', ln)
  const { name, email, products } = req.body as PurchaseRequest;
 try {
    if(products.length === 0){
      return res.status(400).json({
        error: "Please select products to purchase",
      });
    }
  
    console.log('ln.lnurlpData', ln.lnurlpData);
    console.log('ln address', ln.address)

    // await (new LightningAddress('mubarak23@getalby.com')).fetch()
    // console.log('try another way to fetch', await (new LightningAddress('mubarak23@getalby.com')).fetch())
    await ln.fetch()
    console.log('await ln.fetch()',  await ln.fetch())

    const invoice = await ln.requestInvoice({
      satoshi: sumAmount(products),
      comment: getInvoiceComment(req.body),
      payerdata: {
        name: name,
        email: email,
      },
    });
    listenInvoice(req, invoice, res);
    console.log(invoice);

    return res.status(200).json({
      invoice: products
    })
  } catch (error) {
    res.status(400).json({
      error: "Error encountered while generating invoice",
    });
  }
}