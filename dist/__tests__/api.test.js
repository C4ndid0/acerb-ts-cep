"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
describe('CEP API', () => {
    it('GET /cep/:cep should return CEP data', async () => {
        const response = await (0, supertest_1.default)(index_1.default).get('/cep/01001000');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('Logradouro', 'Praça da Sé');
        expect(response.body).toHaveProperty('Bairro', 'Sé');
        expect(response.body).toHaveProperty('Municipio', 'São Paulo');
    });
    it('GET /cep/:cep should return 500 for invalid CEP', async () => {
        const response = await (0, supertest_1.default)(index_1.default).get('/cep/invalid');
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'CEP inválido');
    });
});
