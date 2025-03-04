import { execFileSync } from 'child_process';
import * as path from 'path';

const platform = process.platform;
const binPath = platform === 'win32'
  ? path.join(__dirname, '../bin/acbr_cep_win.exe')
  : platform === 'linux'
  ? path.join(__dirname, '../bin/acbr_cep_linux')
  : null;

export async function buscarCEP(cep: string): Promise<any> {
  if (platform === 'darwin' || !binPath) {
    console.warn('macOS detected or no binary available. Using mock mode.');
    if (cep === '01001000') {
      return { Logradouro: 'Praça da Sé', Bairro: 'Sé', Municipio: 'São Paulo' };
    }
    throw new Error('CEP inválido');
  }

  try {
    const resposta = execFileSync(binPath, [cep], { encoding: 'utf8' }).trim();
    return JSON.parse(resposta);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    throw new Error(errMsg);
  }
}