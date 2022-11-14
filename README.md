# Suppis

Innovative way to market and communicate

## Command line tool

Use Suppis through command line

### How to install

1. Clone project to your computer with : `git clone https://github.com/Nummenpojat/suppis-core.git`
2. Run `npm install` to install all dependencies of [Suppis-core](https://github.com/Nummenpojat/suppis-core)
3. Compile Typescript to Javascript with `npm run build`
3. Run `npm i -g` to install Suppis as global script
4. Now you can run `suppis` command anywhere

#### If you want to send same message to list of people
1. Make Firebase project
2. Go to project settings => Service accounts => Firebase Admin sdk => and download your private key
3. Copy the .json file to your project
4. Configure src/main.ts to use your .json
5. Add some numbers by firebase console to persons / [person id] / number: [phone number] **Also remember that name is required**
6. Now you can use `suppis send [your message] list` to send message to everybody at persons collection

### Things to know before using
- When creating new Whatsapp session wait until the session finishes synchronizing so your session gets saved

## API
- send advertisement --- /module/whatsapp/send/ad
- send message to list of people --- /module/whatsapp/send/list
- send message to single person --- /module/whatsapp/send/one
- make new whatsapp session --- /module/whatsapp/new
- 