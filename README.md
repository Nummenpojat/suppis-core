# Suppis-core
Innovative way to market 📣 and communicate 💬

## How to install and use 💾
1. Clone project to your computer with : `git clone https://github.com/Nummenpojat/suppis-core.git`
2. Run `npm install` to install dependencies of [Suppis-core](https://github.com/Nummenpojat/suppis-core)
3. Configure [Firebase 🔥](https://firebase.google.com/) 
   1. Make Firebase project
   2. Go to Authentication and enable Google as sign-in provider
   3. Enable AppCheck. Check [docs](https://firebase.google.com/docs/app-check/web/recaptcha-provider) for the information how to do it
      - Note that some steps on the documentation referenced above apply to frontend
   4. Go to project settings >> Service accounts >> Firebase Admin sdk >> and download your private key
   5. Copy the serviceAccountKey.json file to your project
4. Make `.env` file to the root
5. Configure all environment variables as in `.env.example` and below
    ````dotenv
    PORT= # Port number
    FIREBASE_SECRET_KEY_PATH= # File path to Firebase service key. Example: "/config/firebase-admin-secrets/secret-key.json"
    WHATSAPP_SESSION_PATH= # File path where whatsapp-web.js stores session
    ````

6. Run `npm install -g ts-node` to run Suppis in development
7. Now you can run `npm run dev` or `npm run start` to start up the app
    - If you want to build the app run `npm run build`

## Running in Docker
1. Install [Docker](https://www.docker.com/)
2. Configure env variables in `Dockerfile` and `docker-compose.yml`
3. Run `docker compose up` ([If something does not work, be sure to consult docs](https://docs.docker.com/compose/))

## Technologies
Suppis uses as it's main component [Whatsapp-Web.js](https://wwebjs.dev/) library, which is used to send messages and [Firebase](https://firebase.google.com/) for authentication and API security
Also some other technologies that Suppis uses are [Express](https://expressjs.com/) for API, [Typescript](https://www.typescriptlang.org/) for better developer experience and [React](https://reactjs.org/) on the frontend for the admin panel

## API 🔗
Every request must contain these headers like this 👇

`````json
{
  "X-Firebase-IdToken": "Your Firebase IdToken here",
  "X-Firebase-AppCheck": "Your Firebase AppCheckToken here"
}
`````
Check Firebase docs how to get [IdToken](https://firebase.google.com/docs/auth/admin/verify-id-tokens#web) and [AppCheckToken](https://firebase.google.com/docs/app-check/web/custom-resource)

### Routes
- Make user admin on `/admin/set`
    - Put request
    - Takes email in body
      - `"email": <email>`
    - Responses with string on the body containing message
- Remove admin from user on `/admin/remove`
  - Delete request
  - Takes email in body
    - `"email": <email>`
  - Responses with string containing message
- Check status of Whatsapp client on `/whatsapp/status`
  - Any request type 
  - Responses with string on the body containing message
    - On status code 409 responses with object like 👇
    ``` json
    {
        "type": "qr"
        "data": "<qr code as text>"
    }
    ```
- Send message to one person on `/whatsapp/send/one`
    - Post request
    - Takes a message and a number in body
    - Responses with string on the body containing message
- Send message to list of people on `/whatsapp/send/list`
    - Post request
    - Takes a message and list of numbers in body
    - Responses with string on the body containing message
