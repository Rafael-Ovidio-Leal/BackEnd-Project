FROM node:18

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

ENV GENERATE_SOURCEMAP false

ENV NODE_OPTIONS=--max_old_space_size=16384 

CMD ["npm", "start"]