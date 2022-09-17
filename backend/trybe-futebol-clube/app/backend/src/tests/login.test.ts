import * as chai from 'chai';
import 'chai-http';

import { app } from '../app';
import { Response } from 'superagent';

chai.use(require('chai-http'));
const { expect } = chai;

describe('Verifica se login é efetuado com sucesso', () => {
  it('Verifica se recebe o token e o status 200OK', async () => {
    const chaiHttpResponse: Response = await chai.request(app).post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });
    const { user: { username }, token } = chaiHttpResponse.body;
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(username).to.be.equal('Admin');
    expect(token).not.to.be.undefined;
  });
});

describe('Verifica se Login não é efetuado com sucesso', () => {
  it('Email indefinido', async () => {
    const chaiHttpResponse: Response = await chai.request(app).post('/login')
    .send({ password: 'secret_admin' })

    expect(chaiHttpResponse.status).to.be.equal(400);
  });
  it('Email inválido', async () => {
    const chaiHttpResponse: Response = await chai.request(app).post('/login')
    .send({ email: 'adminadmin.com', password: 'secret_admin' })

    expect(chaiHttpResponse.status).to.be.equal(401);
  });
  it('Senha indefinida', async () => {
    const chaiHttpResponse: Response = await chai.request(app).post('/login')
    .send({ email: 'admin@admin.com' });
    expect(chaiHttpResponse.status).to.be.equal(400);
  });
  it('Senha errada', async () => {
    const chaiHttpResponse: Response = await chai.request(app).post('/login')
    .send({ email: 'admin@admin.com', password: '123123' });
    expect(chaiHttpResponse.status).to.be.equal(401);
  });
});
