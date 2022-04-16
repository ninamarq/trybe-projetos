import connection from '../models/connection';
import ProductsModel from '../models/products';
import IProducts from '../interfaces/products';

class ProductsService {
  public model: ProductsModel;

  constructor() {
    this.model = new ProductsModel(connection);
  }

  public async getAll(): Promise<IProducts[]> {
    const products = await this.model.getAll();
    return products;
  }

  public async postProduct(product: IProducts): Promise<IProducts> {
    return this.model.postProduct(product);
  }
}

export default ProductsService;