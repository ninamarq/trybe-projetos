import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

export interface ICar {
  model: string;
  year: number;
  color: string;
  status?: boolean;
  buyValue: number;
  doorsQty: number;
  seatsQty: number;
}

export const CarSchema = VehicleSchema.extend({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

type Car = z.infer<typeof CarSchema>;
export { Car };