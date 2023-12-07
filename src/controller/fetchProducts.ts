import { Request, Response } from 'express';
import { Product } from '../interface/ProductInterface';

const data:Array<Product> = require('../../data.json');

export const fetchProducts = (req: Request, res: Response) => {
  try {
    res.status(200).json({
      data: data
    })
  } catch (error) {
    res.status(400).json({
      error: "Error while fetching products"
    })
  }
}