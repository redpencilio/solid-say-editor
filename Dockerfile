FROM madnificent/ember:3.20.0 as builder

LABEL maintainer="info@redpencil.io"

WORKDIR /app
COPY package.json .
RUN mkdir -p /app/lib/ember-rdfa-editor-say-solid-plugin
COPY ./lib/ember-rdfa-editor-say-solid-plugin/package.json /app/lib/ember-rdfa-editor-say-solid-plugin/
RUN npm install
RUN cd /app/lib/ember-rdfa-editor-say-solid-plugin; npm install
COPY . .
RUN ember build -prod

FROM semtech/ember-proxy-service:1.5.0

COPY --from=builder /app/dist /app
