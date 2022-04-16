import { Request, Response } from 'express';
import jwtToken from '../helpers/authJWT';
import UsersService from '../services/users';

class ProductsController {
  constructor(private usersService = new UsersService()) {}

  public createUser = async (req: Request, res: Response) => {
    const user = req.body;
    const userCreated = await this.usersService.createUser(user);
    const token = jwtToken({ id: userCreated.id, username: user.username });
    return res.status(201).json({ token });
  };
}

export default ProductsController;