FROM node:16.13-alpine
WORKDIR /app
COPY . .
RUN npm i 
ENV UIKey = example
EXPOSE 3000
CMD ["npm","start"]


