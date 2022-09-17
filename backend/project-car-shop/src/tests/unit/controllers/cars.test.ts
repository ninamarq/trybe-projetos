import chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

import { app } from '../../../app';
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

describe('Verifica rota /cars', () => {
  it('Verifica se cria carro corretamente com status 201', async () => {
    chai.request(app)
      .post('/cars')
      .send({
        model: 'Uno da Escada',
        year: 1963,
        color: 'red',
        buyValue: 3500,
        seatsQty: 2,
        doorsQty: 2
      })
      .end((res: Response) => {
        expect(res).to.have.status(201);
    });
  });

  it('Verifica se recebe array de carros e status 200', async () => {
    chai.request(app).get('/cars')
      .end((res: Response) => {
        expect(res).to.have.status(200);
      });
  });

  it('Verifica se lê somente um carro', async () => {
    chai.request(app).get('/cars/629668bda80c58533f19749c')
      .end((res: Response) => {
        expect(res).to.have.status(200);
        expect(res).to.be.equal(createdCar);
      });
  });

  it('Verifica se edita carro e status 200', async () => {
    chai.request(app).put('/cars/629668bda80c58533f19749c')
      .send({
        model: 'Uninho Bala',
        year: 1963,
        color: 'black',
        buyValue: 12500,
        seatsQty: 4,
        doorsQty: 2
      })
      .end((res: Response) => {
        expect(res).to.have.status(200);
      });
  });

  it('Verifica se deleta carro e status 200', async () => {
    chai.request(app).delete('/cars/629668bda80c58533f19749c')
      .end((res: Response) => {
        expect(res).to.have.status(204);
      });
  });
});