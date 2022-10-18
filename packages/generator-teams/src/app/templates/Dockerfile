FROM node:16 AS BUILD_IMAGE

WORKDIR /app

COPY . /app/

# install 
RUN npm install -g npm
RUN npm install -g node-prune
RUN npm install 

# build
RUN npm run build

# remove development dependencies
RUN npm prune --production

# run node prune
RUN /usr/local/bin/node-prune

FROM node:16-alpine

WORKDIR /app

# copy from build image
COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

ENV DEBUG msteams

EXPOSE 3007

CMD [ "node", "dist/server.js" ]
