# Use uma imagem oficial do Node.js como imagem de base
FROM node:lts-alpine

# Defina o diretório de trabalho no container
RUN mkdir -p RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api
WORKDIR /home/node/api

# Copie o arquivo package.json (e package-lock.json, se existir) para o diretório de trabalho
COPY package.json yarn.* ./

USER node

COPY --chown=node:node . .

# Instale as dependências do projeto
RUN npm install

# Copie os arquivos do projeto para o diretório de trabalho
COPY . .

# A porta em que seu microserviço estará disponível
EXPOSE 3000

# RUN npx sequelize-cli db:migrate

# Comando para executar o aplicativo
CMD ["npm", "start"]
