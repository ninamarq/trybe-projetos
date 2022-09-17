import * as chai from 'chai';
import 'chai-http';

import { app } from '../app';
import { Response } from 'superagent';

chai.use(require('chai-http'));
const { expect } = chai;

describe('Verifica se a rota /teams funciona corretamente', () => {
  it('Verifica se o status é 200OK', async () => {
    const chaiHttpResponse: Response = await chai.request(app).get('/teams');
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('A requisição GET para a rota /teams retorna lista de times',
    async () => {
      const chaiHttpResponse: Response = await chai.request(app).get('/teams');
      expect(chaiHttpResponse.body[0]).to.be.deep.equal({ id: 1, teamName: 'Avaí/Kindermann' });
      expect(chaiHttpResponse.body).to.have.length(16);
    }
  );
});

describe('Verifica se a rota /teams/:id funciona corretamente', () => {
  it('Verifica se o status é 200OK', async () => {
    const chaiHttpResponse: Response = await chai.request(app).get('/teams/1');
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('A requisição GET para a rota /teams/1 retorna time correto',
    async () => {
      const chaiHttpResponse: Response = await chai.request(app).get('/teams/1');
      expect(chaiHttpResponse.body).to.be.deep.equal({ id: 1, teamName: 'Avaí/Kindermann' });
    }
  );
});