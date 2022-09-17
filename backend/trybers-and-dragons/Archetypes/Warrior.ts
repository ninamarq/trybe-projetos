import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Warrior extends Archetype {
  private _energyType: EnergyType;
  static instances = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'stamina';
  }

  static createdArchetypeInstances() {
    Warrior.instances += 1;
    return Warrior.instances;
  }

  get energyType(): EnergyType {
    return this._energyType;
  }
}
