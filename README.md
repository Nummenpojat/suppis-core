# Suppis

Innovative way to market and communicate

## Command line tool

Use Suppis through command line

### How to install

1. Clone project to your computer with : <code>git clone https://github.com/Nummenpojat/suppis-core.git`</code>
2. Run <code>npm install</code> to install all dependencies of [Suppis-core](https://github.com/Nummenpojat/suppis-core)
3. Compile Typescript to Javascript with <code>npm run build</code>
3. Run <code>npm i -g</code> to install Suppis as global script
4. Now you can run <code>suppis</code> command anywhere

#### If you want to send same message to list of people
1. Make Firebase project
2. Go to project settings => Service accounts => Firebase Admin sdk => and download your private key
3. Copy the serviceAccountKey.json file to your project
4. Configure src/main.ts to use your serviceAccountKey.json<br/>
  ```typescript 
  // This is right after imports on src/main.ts
  const ServiceAccount = require('yourServiceAccountKeyFilePathHere');
  const app = initializeApp({
    credential: credential.cert(ServiceAccount)
  });
  ```
5. Add some numbers by firebase console to persons / [person id] / number: [phone number] **Also remember that name is required**
6. Now you can use <code>suppis send [your message] list</code> to send message to everybody at persons collection

### Things to know before using
- When creating new Whatsapp session wait until the session finishes synchronizing so your session gets saved

## API
### Backend APIs
- send advertisement --- /module/whatsapp/send/ad
- send message to list of people --- /module/whatsapp/send/list
- send message to single person --- /module/whatsapp/send/one
- make new whatsapp session --- /module/whatsapp/new

### Firebase direct APIs
- get / post / put / delete event
- get events
