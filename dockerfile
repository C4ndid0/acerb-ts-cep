FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache build-base
COPY package*.json ./
RUN npm install
COPY bin/ ./bin/
COPY lib/ ./lib/
COPY src/ ./src/
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]