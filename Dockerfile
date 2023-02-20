FROM node:18
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
EXPOSE 17008
ENV NODE_ENV ${NODE_ENV}
CMD ["node", "dist/main.js"]