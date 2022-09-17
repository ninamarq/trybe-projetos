import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarService from '../services/Cars';
import { Car } from '../interfaces/CarInterface';

const limitCarac = 'Id must have 24 hexadecimal characters';

class CarController extends Controller<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ) => {
    const carToCreate = req.body;
    try {
      const car = await this.service.create(carToCreate);
      if (!car) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in car) {
        return res.status(400).json(car);
      }
      return res.status(201).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<Car[] | ResponseError>,
  ) => {
    try {
      const cars = await this.service.read();
      return res.status(200).json(cars);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readonly = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ) => {
    try {
      const { id } = req.params;
      if (id.length !== 24) {
        return res.status(400).json({
          error: limitCarac,
        });
      }
      const car = await this.service.readOne(id);
      if (!car) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(200).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ) => {
    try {
      const { id } = req.params;
      const editedKeys = req.body;
      if (id.length !== 24 || Object.keys(editedKeys).length === 0) {
        return res.status(400)
          .json({ error: limitCarac });
      }
      const editedCar = await this.service.update(id, editedKeys);
      if (!editedCar) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(200).json(editedCar);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ) => {
    try {
      const { id } = req.params;
      if (id.length !== 24) {
        return res.status(400)
          .json({ error: limitCarac });
      }
      const deletedCar = await this.service.delete(id);
      if (!deletedCar) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarController;