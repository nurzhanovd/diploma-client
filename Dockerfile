FROM node:12.17.0-alpine as base

WORKDIR /diploma-client
COPY . .
RUN yarn import && \
rm -rf node_modules && \
yarn install && \
yarn apollo && \
yarn build

FROM nginx
COPY --from=base /diploma-client/build /usr/share/nginx/html
