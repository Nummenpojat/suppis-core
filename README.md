# Suppis

Innovative way to market and communicate

## How to install

1. Clone project to your computer with : `git clone https://github.com/Nummenpojat/suppis-core.git`
2. Run `npm install` to install dependencies of [Suppis-core](https://github.com/Nummenpojat/suppis-core)
3. Run `npm install -g ts-node` to install ts-node, so you don't have to build the project every time
4. Now you can run `npm run dev` or `npm run start` to start up the app
   - If you want to build the app run `npm run build


## How to configure [Firebase](https://firebase.google.com/)
1. Make Firebase project
2. Go to Authentication and enable Google as sign-in provider
3. Go to project settings >> Service accounts >> Firebase Admin sdk >> and download your private key
4. Copy the serviceAccountKey.json file to your project
5. Configure src/main.ts to use your serviceAccountKey.json<br/>
  ```typescript 
  // This is right after imports on src/main.ts
  const ServiceAccount = require('yourServiceAccountKeyFilePathHere');
  const app = initializeApp({
    credential: credential.cert(ServiceAccount)
  });
  ```
## API
- Make user admin on `/admin`
  - Put request
  - Takes email in body
- Send message to one person on `/whatsapp/send/one`
  - Post request
  - Takes a message and a number in body
