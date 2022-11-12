#! /usr/bin/env node
import {Command} from 'commander';
import {listenWhatsapp, newWhatsappSession} from "../modules/whatsapp/main";
import {sendMessage} from "../modules/whatsapp/commands/sendMessage";
import {sendBulkMessage} from "../modules/whatsapp/commands/sendBulkMessage";

const qrcode = require("qrcode-terminal")

const program = new Command();

program
  .name('suppis')
  .description('Innovative way to market and communicate to masses')
  .version('0.0.0');

program.command('new')
  .description('make new Whatsapp session')
  .action(() => {
    newWhatsappSession()
      .then((qr) => {
        qrcode.generate(qr, {small: true})
      })
      .catch((reason) => {
        console.log(`Error "${reason}" was emitted`)
      })
  });

program.command('listen')
  .description('listen for Whatsapp messages')
  .action(() => {
    listenWhatsapp()
  });

program.command('send')
  .description('send message with Whatsapp')
  .arguments('<message> <type> [phone_number]')
  .action((message: string, type: string, phone_number: string,) => {
    // Testing the type how to send a message
    if (type == "list") {
      sendBulkMessage(message)
    } else {
      sendMessage(phone_number, message)
    }
  });

program.parse();
