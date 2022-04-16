import IUsers from '../interfaces/users';
import connection from '../models/connection';
import UsersModel from '../models/users';

class ProductsService {
  public model: UsersModel;

  constructor() {
    this.model = new UsersModel(connection);
  }

  public async createUser(user: IUsers): Promise<IUsers> {
    return this.model.createUser(user);
  }
}

export default ProductsService;