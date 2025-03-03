"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarCEP = buscarCEP;
const path = __importStar(require("path"));
const bindings = require('bindings');
const platform = process.platform;
const libPath = platform === 'win32'
    ? path.join(__dirname, '../lib/windows/ACBrCEP64.dll')
    : path.join(__dirname, '../lib/linux/libacbrcep64.so');
let acbr;
if (platform === 'darwin') {
    console.warn('macOS detected. Using mock mode for development.');
    acbr = {
        buscarCEP: (cep) => {
            if (cep === '01001000') {
                return JSON.stringify({ Logradouro: 'Praça da Sé', Bairro: 'Sé', Municipio: 'São Paulo' });
            }
            throw new Error('CEP inválido');
        },
    };
}
else {
    acbr = bindings({
        bindings: 'acbr_cep',
        module_root: path.join(__dirname, '..'),
    });
}
async function buscarCEP(cep) {
    try {
        const resposta = acbr.buscarCEP(cep);
        return JSON.parse(resposta);
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }
}
