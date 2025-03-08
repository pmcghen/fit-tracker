FROM node:20.18-alpine AS builder

WORKDIR /app/frontend/

COPY package*.json /app/frontend/
RUN npm install

COPY . /app/frontend/

RUN npm run build
RUN npm prune --production

FROM node:20.18-alpine
WORKDIR /app/frontend
COPY --from=builder /app/frontend/build build/
COPY --from=builder /app/frontend/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "build"]