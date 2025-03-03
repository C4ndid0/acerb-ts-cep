#include "acbr_cep.h"
#include <string>

// Declarações das funções da ACBrLib (ajuste conforme a API real)
extern "C" {
    int CEP_Inicializar(const char* config);
    int CEP_Finalizar();
    int CEP_BuscarPorCEP(const char* cep, const char* config, char* resposta, int* tamanho);
    int CEP_UltimoRetorno(char* buffer, int* tamanho);
}

Napi::String BuscarCEP(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 1 || !info[0].IsString()) {
        Napi::TypeError::New(env, "CEP must be a string").ThrowAsJavaScriptException();
        return Napi::String::New(env, "");
    }

    std::string cep = info[0].As<Napi::String>().Utf8Value();
    char resposta[1024] = {0};
    int tamanho = 1024;

    int iniResult = CEP_Inicializar("");
    if (iniResult != 0) {
        Napi::Error::New(env, "Failed to initialize ACBr CEP").ThrowAsJavaScriptException();
        return Napi::String::New(env, "");
    }

    int result = CEP_BuscarPorCEP(cep.c_str(), "", resposta, &tamanho);
    if (result != 0) {
        char erro[1024] = {0};
        int erroTamanho = 1024;
        CEP_UltimoRetorno(erro, &erroTamanho);
        CEP_Finalizar();
        Napi::Error::New(env, std::string("CEP lookup failed: ") + erro).ThrowAsJavaScriptException();
        return Napi::String::New(env, "");
    }

    CEP_Finalizar();
    return Napi::String::New(env, resposta);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("buscarCEP", Napi::Function::New(env, BuscarCEP));
    return exports;
}

NODE_API_MODULE(acbr_cep, Init)