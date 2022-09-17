import * as chai from 'chai';
import 'chai-http';

import { app } from '../app';
import { Response } from 'superagent';

chai.use(require('chai-http'));
const { expect } = chai;

describe('Verifica se a rota /matches funciona corretamente', () => {
  it('Verifica se o status é 200OK', async () => {
    const chaiHttpResponse: Response = await chai.request(app).get('/matches');
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('A requisição GET para a rota /matches retorna lista de matches',
    async () => {
      const chaiHttpResponse: Response = await chai.request(app).get('/matches');
      expect(chaiHttpResponse.body[0]).to.be.deep.equal({
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      });
      expect(chaiHttpResponse.body).to.have.length(48);
    }
  );
});

describe('Verifica se a rota /matches cria partida com sucesso', () => {
  it('Retorna status 201 e a partida adicionada', async () => {
    const chaiHttpResponse: Response = await chai.request(app).post('/matches')
      .send({
        "homeTeam": 1,
        "awayTeam": 15,
        "homeTeamGoals": 6,
        "awayTeamGoals": 2,
        "inProgress": true
      });
    expect(chaiHttpResponse).to.have.status(201);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      "id": 49,
      "homeTeam": 1,
      "awayTeam": 15,
      "homeTeamGoals": 6,
      "awayTeamGoals": 2,
      "inProgress": true
    });
  });

  it('Retorna status 401 caso seja enviado times iguais', async () => {
    const chaiHttpResponse: Response = await chai.request(app).post('/matches')
      .send({
        "homeTeam": 1,
        "awayTeam": 1,
        "homeTeamGoals": 6,
        "awayTeamGoals": 2,
        "inProgress": true
      });
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      "message": "It is not possible to create a match with two equal teams"
    });
  });

  it('Retorna status 404 caso seja enviado time com id inexistente', async () => {
    const chaiHttpResponse: Response = await chai.request(app).post('/matches')
      .send({
        "homeTeam": 121123,
        "awayTeam": 1,
        "homeTeamGoals": 6,
        "awayTeamGoals": 2,
        "inProgress": true
      });
    expect(chaiHttpResponse).to.have.status(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      "message": "There is no team with such id!"
    });
  });
});

describe('Verifica rota /matches/:id/finish', () => {
  it('Retorna 200 se partida é finalizada com sucesso', async () => {
    const chaiHttpResponse: Response = await chai.request(app).patch('/matches/45/finish');
    expect(chaiHttpResponse).to.have.status(200);
  });
});

describe('Verifica PATCH na rota /matches:id', () => {
  it('Retorna status 200 quando partida é editada', async () => {
    const chaiHttpResponse: Response = await chai.request(app).patch('/matches/48')
      .send({ homeTeamGoals: 3, awayTeamGoals: 1 });
    expect(chaiHttpResponse).to.have.status(200);
  });
});