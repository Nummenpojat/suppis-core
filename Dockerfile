FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm i

# Install Chromium.
RUN \
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
  apt-get update && \
  apt-get install -y google-chrome-stable && \
  rm -rf /var/lib/apt/lists/*s

COPY . ./

# Port number
ENV PORT=Configure this
# File path to Firebase service key. Example: "/config/firebase-admin-secrets/secret-key.json"
ENV FIREBASE_SECRET_KEY_PATH=Configure this

ENV WHATSAPP_SESSION_PATH=Configure this

EXPOSE Configure this

RUN npm run build

CMD [ "npm", "run", "start-build" ]