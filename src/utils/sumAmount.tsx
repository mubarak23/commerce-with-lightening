import { Product } from "../interface/ProductInterface";
const data: Array<Product> = require("../../data.json");


export const sumAmount = (products: Array<number>): number => {
  let sum = 0
  products.forEach((product)=> {
    sum += data.filter((item) => item.id === product)[0].price
  })
  return sum;
}