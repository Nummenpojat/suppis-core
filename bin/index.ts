#! /usr/bin/env node

import {Command} from 'commander';
import {listenWhatsapp, newWhatsappSession} from "../src/modules/whatsapp/main";
import {sendMessage} from "../src/modules/whatsapp/sendMessage";

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
  .arguments('<message> <phone_number>')
  .action((message: string, phone_number: string) => {
    sendMessage(phone_number, message)
  });

program.parse();
