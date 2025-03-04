#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Declarações da ACBrLib (ajuste conforme a API real)
int CEP_Inicializar(const char *config);
int CEP_Finalizar();
int CEP_BuscarPorCEP(const char *cep, const char *config, char *resposta, int *tamanho);
int CEP_UltimoRetorno(char *buffer, int *tamanho);

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        printf("{\"error\": \"CEP deve ser fornecido como argumento\"}\n");
        return 1;
    }

    const char *cep = argv[1];
    char resposta[1024] = {0};
    int tamanho = 1024;

    int iniResult = CEP_Inicializar("");
    if (iniResult != 0)
    {
        printf("{\"error\": \"Erro ao inicializar ACBr CEP\"}\n");
        return 1;
    }

    int result = CEP_BuscarPorCEP(cep, "", resposta, &tamanho);
    if (result != 0)
    {
        char erro[1024] = {0};
        int erroTamanho = 1024;
        CEP_UltimoRetorno(erro, &erroTamanho);
        CEP_Finalizar();
        printf("{\"error\": \"%s\"}\n", erro);
        return 1;
    }

    CEP_Finalizar();
    printf("%s\n", resposta);
    return 0;
}