#! /usr/bin/env node
import {Command} from 'commander';
import {newWhatsappSession} from "../src/modules/whatsapp/main";

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

program.parse();
