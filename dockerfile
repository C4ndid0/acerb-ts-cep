FROM node:18-alpine
WORKDIR /app

# Instalar ferramentas de build
RUN apk add --no-cache python3 make g++ linux-headers

# Copiar arquivos de configuração
COPY package*.json binding.gyp ./

# Instalar dependências npm
RUN npm install

# Copiar o código fonte
COPY . .

# Depuração: listar arquivos para garantir que src/native/acbr_cep.cc existe
RUN ls -la src/native/

# Compilar o projeto
RUN npm run build || (echo "Build failed, showing logs:" && cat /root/.npm/_logs/*-debug-0.log && exit 1)

EXPOSE 3000
CMD ["npm", "start"]