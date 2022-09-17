import Archetype, { Mage } from './Archetypes';
import Energy, { EnergyType } from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _lifePoints: number;
  private _maxLifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;
  private _type: EnergyType;
  private _amount: number;

  constructor(nameCharacter: string) {
    this._race = new Elf(nameCharacter, 10);
    this._archetype = new Mage(nameCharacter);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._dexterity = this._race.dexterity;
    this._type = this._archetype.energyType;
    this._amount = getRandomInt(1, 10);
    this._energy = {
      type_: this._type,
      amount: this._amount,
    };
  }

  public receiveDamage(attackPoints: number):number {
    const damage = attackPoints - this._defense;
    if (damage > 0) {
      this._lifePoints -= damage;
    }

    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }

    return this._lifePoints;
  }

  public attack(enemy: SimpleFighter):void {
    enemy.receiveDamage(this._strength);
  }

  public levelUp():void {
    this._maxLifePoints += getRandomInt(1, 10);
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);

    this._amount = 10;
    this._energy.amount = this._amount;

    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }

    this._lifePoints = this._maxLifePoints;
  }

  public special(enemy: SimpleFighter) {
    // dano reduzido pela força e destreza do inimigo
    enemy.receiveDamage(this._strength / this._dexterity);
  }

  get race():Race { return this._race; }

  get archetype():Archetype { return this._archetype; }

  get lifePoints():number { return this._lifePoints; }

  get maxLifePoints():number { return this._maxLifePoints; }

  get strength():number { return this._strength; }

  get defense():number { return this._defense; }

  get dexterity():number { return this._dexterity; }

  get energy():Energy {
    return {
      type_: this._type,
      amount: this._amount,
    }; 
  }
}
