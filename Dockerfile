# Build project
FROM node:alpine as builder

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .


ARG NODE_ENV=production
ARG REACT_APP_API_ROOT

ENV NODE_ENV ${NODE_ENV}
ENV REACT_APP_API_ROOT ${REACT_APP_API_ROOT}

RUN npm run-script build

# Serve bundle
FROM nginx:alpine

COPY --from=builder /usr/app/config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/build /usr/share/nginx/html/editor
