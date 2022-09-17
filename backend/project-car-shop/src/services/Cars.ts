import { ICar, CarSchema } from '../interfaces/CarInterface';
import Service, { ServiceError } from '.';
import CarModel from '../models/Cars';

class CarService extends Service<ICar> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: ICar): Promise<ICar | ServiceError | null> => {
    const parsed = CarSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };

  read = async (): Promise<ICar[]> => this.model.read();

  readonly = async (id: string): Promise<ICar | null> => this.model.readOne(id);

  update = async (id: string, obj: ICar) => {
    await this.model.update(id, obj);
    const newCar = await this.model.readOne(id);
    return newCar;
  };

  delete = async (id: string): Promise<ICar | null> => this.model.delete(id);
}

export default CarService;