#! /usr/bin/env node
import {Command} from 'commander';
import {deleteWhatsapp, listenWhatsapp, newWhatsappSession} from "../src/modules/whatsapp/main";

const program = new Command();

program
  .name('suppis')
  .description('Innovative way to market and communicate to masses')
  .version('0.0.0');

program.command('new')
  .description('make new messenger session. Options at this point are: Whatsapp')
  .arguments('<provider>')
  .action(() => {
    newWhatsappSession()
  });

program.command('listen')
  .description('Listen for messages. Options at this point are: Whatsapp')
  .arguments('<provider>')
  .action((provider) => {
    if (provider == "whatsapp") {
      console.log(`Using provider ${provider}`)
      listenWhatsapp()
    } else {
      console.error(`Provider ${provider} was invalid`)
    }
  });

program.parse();
