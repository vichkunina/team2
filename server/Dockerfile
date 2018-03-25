FROM node:8

COPY package*.json ./
RUN npm install --production

COPY . .

ENV PORT 80
EXPOSE 80

ENV NODE_ENV production

CMD ["npm", "start"]