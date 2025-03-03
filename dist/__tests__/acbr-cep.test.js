"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const acbr_cep_1 = require("../acbr-cep");
describe('ACBr CEP Module', () => {
    it('should return CEP data for a valid CEP', async () => {
        const cep = '01001000';
        const result = await (0, acbr_cep_1.buscarCEP)(cep);
        expect(result).toHaveProperty('Logradouro', 'Praça da Sé');
        expect(result).toHaveProperty('Bairro', 'Sé');
        expect(result).toHaveProperty('Municipio', 'São Paulo');
        expect(typeof result).toBe('object');
    });
    it('should throw an error for an invalid CEP', async () => {
        const cep = 'invalid';
        await expect((0, acbr_cep_1.buscarCEP)(cep)).rejects.toThrow('CEP inválido');
    });
});
