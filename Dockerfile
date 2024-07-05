FROM node:22.1.0-alpine3.19 as build
RUN npm install -g pm2

WORKDIR /usr/main
COPY . .
RUN yarn
RUN yarn build

FROM dh-mirror.gitverse.ru/nginxinc/nginx-unprivileged:stable-alpine
WORKDIR /usr/main
COPY --from=build /usr/main ./
COPY ./docker/nginx /etc/nginx/conf.d
EXPOSE 80 443

CMD ["sh", "-c", "pm2 start yarn --name main -- start && nginx -g 'daemon off;'"]
