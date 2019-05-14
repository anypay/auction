#!/usr/bin/env ts-node

require('dotenv').config();

import { publish } from '../lib/events';

const commander = require('commander')
const program = new commander.Command();
program
  .version('0.0.1')
  .description('Auction program')
  .parse(process.argv);

program
  .command('addUser')
  .alias('U')
  .description('Add a new user.')
  .action(function() {
    console.log('Adding user')

    publish('user.added', 'newusername');
    
  });

program
  .command('removeUser')
  .alias('RU')
  .description('Remove a user.')
  .action(function() {
    console.log('Removing user')
  })

program
  .command('addItem')
  .alias('I')
  .description('Add an auction item.')
  .action(function() {
    console.log('Adding auction item')
  });

program
  .command('removeItem')
  .alias('RI')
  .description('Remove an auction item.')
  .action(function() {
    console.log('Removing item')
  });

program
  .command('placeBid')
  .alias('B')
  .description('Place a bid.')
  .action(function() {
    console.log('Placing bid')
  });

program
  .command('checkHighest')
  .alias('C')
  .description('Check the highest bid.')
  .action(function() {
    console.log('Checking highest bid')
  });

program
  .command('closeAuction')
  .alias('X')
  .description('End an auction.')
  .action(function() {
    console.log('Auction ended')
  })

program.parse(process.argv)
