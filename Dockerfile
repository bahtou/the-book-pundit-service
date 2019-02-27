# ---- Base ----
FROM node:11.10.0-alpine as base


# ---- Build ----
FROM base as build

WORKDIR /opt/app

RUN set -ex; \
    apk update; \
    apk add --no-cache build-base

COPY package*.json ./

RUN npm install --no-progress --loglevel error && npm cache clean --force


# --- Release ----
FROM base as release

ENV APP_SERVICE=the-book-pundit

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG NODE_PORT=3000
ENV NODE_PORT $NODE_PORT

ARG GOODREADS_API_SERVICE=http://localhost:3001
ENV GOODREADS_API_SERVICE $GOODREADS_API_SERVICE

EXPOSE $PORT

RUN set -ex; \
    apk update; \
    apk add --no-cache tini

USER node

WORKDIR /opt/app

COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app/package.json ./
COPY ./bin ./bin
COPY ./src ./src

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "bin/www"]
