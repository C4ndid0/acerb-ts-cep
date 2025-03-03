// src/native/acbr_cep.h
#ifndef ACBR_CEP_H
#define ACBR_CEP_H

#include <napi.h>

Napi::String BuscarCEP(const Napi::CallbackInfo& info);
Napi::Object Init(Napi::Env env, Napi::Object exports);

#endif