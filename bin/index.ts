#! /usr/bin/env node
import {Command} from 'commander';
import { signIn } from "../config/firebase";

const program = new Command();

program
  .name('suppis')
  .description('Innovative way to market and communicate to masses')
  .version('0.0.0');

program.command('login')
  .description('Log in to Suppis')
  .arguments('<username> <password>')
  .action((email: string, password: string) => {
    console.log(email, password)
  });

program.parse();
