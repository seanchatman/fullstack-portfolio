FROM mhart/alpine-node as builder
ENV NODE_ENV="production"
ENV API_URI="https://dykt.io/api"
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]