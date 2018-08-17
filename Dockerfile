FROM petergrainger/alpine-chromium
ENV NODE_ENV=production
ENV DOCKER_DEPLOYMENT=true
COPY js/ /app
COPY package.json /app
WORKDIR /app
RUN npm install
CMD ["node", "index.js"]