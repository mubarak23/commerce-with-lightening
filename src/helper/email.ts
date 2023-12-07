import { Response } from "express";
import { PurchaseRequest } from "../interface/PurchaseRequest";
import { getProductNames } from "../utils/productName";
import { sumAmount } from "../utils/sumAmount";

var nodeMailer = require("nodemailer")
const path = require("path");
const Handlebars = require("handlebars");
const fs = require("fs");
const templatePath = path.join(__dirname, "../templates/email.hbs");
const template = fs.readFileSync(templatePath, "utf-8");
const compiledTemplate = Handlebars.compile(template);

if(!process.env.EMAIL_ADDRESS || !process.env.EMAIL_PASSWORD){
  throw new Error('Please Set your email credentials')
}

async function sendEmailNotification (payload: PurchaseRequest, res:Response) {
  var mail = nodeMailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const html = compiledTemplate({
    name: payload.name,
    email: payload.email,
    amount: sumAmount(payload.products),
    address: payload.address,
    products: getProductNames(payload.products),
    support: "mailto:" + process.env.EMAIL_ADDRESS,
  });

  var mailOptions = {
    from: `"Bitcoin⚡Shop <${process.env.EMAIL_ADDRESS}>"`,
    to: `${payload.email},${process.env.EMAIL_ADDRESS}`,
    replyTo: process.env.EMAIL_ADDRESS,
    subject: "Your order has been received, " + payload.name,
    html: html,
  };

  mail.sendMail(mailOptions, function(error: any, info: any){
    if(!error){
      res.status(200).json({
        message: "Email sent successfully",
      });
      return 
    }else{
      return 
    }
  })
}

export default sendEmailNotification;