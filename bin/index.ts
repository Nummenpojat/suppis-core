#! /usr/bin/env node

import {Command} from 'commander';
const {listenWhatsapp, newWhatsappSession, sendMessage} = require("../src/modules/whatsapp/main");

const program = new Command();

program
  .name('suppis')
  .description('Innovative way to market and communicate to masses')
  .version('0.0.0');

program.command('new')
  .description('make new Whatsapp session')
  .action(() => {
    newWhatsappSession()
  });

program.command('listen')
  .description('listen for Whatsapp messages')
  .action(() => {
      listenWhatsapp()
  });

program.command('send')
  .description('send message with Whatsapp')
  .arguments('<message> <type> <where_to_send>')
  .action((message: string, type: string, where_to_send: string) => {
    if (type === 'to') {
      if (where_to_send.startsWith('+')) {
        sendMessage(where_to_send.substring(1), message)
      } else {
        sendMessage(where_to_send, message)
      }
    }
  });

program.parse();
