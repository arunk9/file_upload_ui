# ----------------------------
# build from source
# ----------------------------
  FROM node:16 AS build

  WORKDIR /app

  COPY package*.json .
  RUN npm install

  COPY . .
  RUN npm run build

  # ----------------------------
  # run with nginx
  # ----------------------------
  FROM nginx

  RUN rm /etc/nginx/conf.d/default.conf
  COPY nginx.conf /etc/nginx/conf.d
  COPY --from=build /app/dist/file_upload_ui /usr/share/nginx/html

  EXPOSE 80
