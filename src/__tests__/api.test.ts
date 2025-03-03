import request from 'supertest';
import app from '../index';

describe('CEP API', () => {
  it('GET /cep/:cep should return CEP data', async () => {
    const response = await request(app).get('/cep/01001000');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('Logradouro', 'Praça da Sé');
    expect(response.body).toHaveProperty('Bairro', 'Sé');
    expect(response.body).toHaveProperty('Municipio', 'São Paulo');
  });

  it('GET /cep/:cep should return 500 for invalid CEP', async () => {
    const response = await request(app).get('/cep/invalid');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'CEP inválido');
  });
});