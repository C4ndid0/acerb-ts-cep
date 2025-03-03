import * as path from 'path';
const bindings = require('bindings');

const platform = process.platform;
const libPath = platform === 'win32'
  ? path.join(__dirname, '../lib/windows/ACBrCEP64.dll')
  : platform === 'darwin'
  ? path.join(__dirname, '../lib/macos/libacbrcep64.dylib')
  : path.join(__dirname, '../lib/linux/libacbrcep64.so');

const acbr = bindings({
  bindings: 'acbr_cep',
  module_root: path.join(__dirname, '..'),
});

export async function buscarCEP(cep: string): Promise<any> {
  try {
    const resposta = acbr.buscarCEP(cep);
    return JSON.parse(resposta);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}