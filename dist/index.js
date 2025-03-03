"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const acbr_cep_1 = require("./acbr-cep");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/cep/:cep', async (req, res) => {
    try {
        const cep = req.params.cep;
        const resultado = await (0, acbr_cep_1.buscarCEP)(cep);
        res.json(resultado);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = app;
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}
