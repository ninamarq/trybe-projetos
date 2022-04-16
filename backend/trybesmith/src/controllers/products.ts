import { Request, Response } from 'express';
import ProductsService from '../services/products';

class ProductsController {
  constructor(private productService = new ProductsService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    return res.status(200).json(products);
  };

  public postProduct = async (req: Request, res: Response) => {
    const product = req.body;
    const productCreated = await this.productService.postProduct(product);
    const bodyResponse = {
      item: productCreated,
    };
    return res.status(201).json(bodyResponse);
  };
}

export default ProductsController;