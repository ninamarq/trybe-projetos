import { Router } from 'express';
import CarController from '../controllers/cars';

const CarsRouter = Router();

const carsController = new CarController();

CarsRouter.post('/', carsController.create);
CarsRouter.get('/', carsController.read);
CarsRouter.get('/:id', carsController.readonly);
CarsRouter.put('/:id', carsController.update);
CarsRouter.delete('/:id', carsController.delete);

export default CarsRouter;