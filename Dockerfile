FROM node:8.10-alpine

RUN set -x && \
  apk add --no-cache \
    libpng \
    libwebp \
    libjpeg-turbo

WORKDIR /app
ADD . /app

RUN set -x && \
  apk add --no-cache --virtual .build-dependencies \
    automake \
    git \
    alpine-sdk  \
    nasm  \
    autoconf  \
    build-base \
    zlib \
    zlib-dev \
    bash \
    gettext \
    libtool \
    libpng-dev\
    libwebp-dev \
    libjpeg-turbo-dev && \
	yarn  && \
  yarn run build && \
  apk del .build-dependencies && \
  yarn cache clean

EXPOSE 8080

ENTRYPOINT ["node","./src/server"]
