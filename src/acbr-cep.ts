import * as path from 'path';
const bindings = require('bindings');

const platform = process.platform;
const libPath = platform === 'win32'
  ? path.join(__dirname, '../lib/windows/ACBrCEP64.dll')
  : path.join(__dirname, '../lib/linux/libacbrcep64.so');

let acbr: any;
if (platform === 'darwin') {
  console.warn('macOS detected. Using mock mode for development.');
  acbr = {
    buscarCEP: (cep: string) => {
      if (cep === '01001000') {
        return JSON.stringify({ Logradouro: 'Praça da Sé', Bairro: 'Sé', Municipio: 'São Paulo' });
      }
      throw new Error('CEP inválido');
    },
  };
} else {
  acbr = bindings({
    bindings: 'acbr_cep',
    module_root: path.join(__dirname, '..'),
  });
}

export async function buscarCEP(cep: string): Promise<any> {
  try {
    const resposta = acbr.buscarCEP(cep);
    return JSON.parse(resposta);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}