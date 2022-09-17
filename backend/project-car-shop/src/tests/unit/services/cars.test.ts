import * as sinon from 'sinon';
import chai from 'chai';
import Cars from '../../../models/Cars';
import CarsService from '../../../services/Cars';

const { expect } = chai;

const createdCar = {
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2,
  _id: "629668bda80c58533f19749c",
}

describe('Verifica services /cars', () => {
  const model = new Cars();
  const service = new CarsService(model);

  describe('Verifica se cria carro corretamente', () => {
      before(async () => {
        sinon.stub(model, 'create').resolves(createdCar);
      });

      after(() => sinon.restore());

      it('Retorna Carro criado', async () => {
        const createService = await service.create(createdCar);
        expect(createService).to.be.an('object');
      })
    });

    describe('Verifica se recupera array de carros corretamente', () => {
      before(async () => {
        sinon.stub(model, 'read').resolves([createdCar]);
      });

      after(() => sinon.restore());

      it('Retorna array de carros', async () => {
        const cars = await service.read();
        expect(cars).to.be.an('array');
      })
    });
});
