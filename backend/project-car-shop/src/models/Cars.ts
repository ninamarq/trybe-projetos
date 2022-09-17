import { Schema, model as createModel, Document } from 'mongoose';
import { ICar } from '../interfaces/CarInterface';
import MongoModel from '.';

interface CarDocument extends ICar, Document { }

const CarSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, {
  versionKey: false,
});

class CarModel extends MongoModel<ICar> {
  constructor(model = createModel('Cars', CarSchema)) {
    super(model);
  }
}
  
export default CarModel;