# ---- Base ----
FROM node:11.10.0-alpine as base


# ---- Build ----
FROM base as build

WORKDIR /opt/build

RUN set -ex; \
    apk update; \
    apk add --no-cache build-base

COPY package*.json ./

RUN npm install --no-progress --loglevel error && npm cache clean --force


# --- Release ----
FROM base as release

WORKDIR /opt/app

ENV APP_SERVICE=the-book-pundit

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG NODE_PORT=3000
ENV NODE_PORT $NODE_PORT

ARG GOODREADS_API_SERVICE=api.thebookpundit.app
ENV GOODREADS_API_SERVICE $GOODREADS_API_SERVICE

EXPOSE $NODE_PORT

RUN set -ex; \
    apk update; \
    apk add --no-cache tini

COPY --from=build /opt/build/node_modules ./node_modules
COPY ./bin ./bin
COPY ./src ./src
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

USER node

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "bin/www"]
