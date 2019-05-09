#!/usr/bin/env node

const commander = require('commander')
const program = new commander.Command();
program
  .version('0.0.1')
  .description('Auction program')
  .parse(process.argv);

program
  .command('addUser')
  .alias('U')
  .action(function() {
    console.log('Adding user')
  });

program
  .command('addItem')
  .alias('I')
  .action(function() {
    console.log('Adding auction item')
  });

program
  .command('removeItem')
  .alias('R')
  .action(function() {
    console.log('Removing item')
  });

program
  .command('placeBid')
  .alias('B')
  .action(function() {
    console.log('Placing bid')
  });

program
  .command('checkHighest')
  .alias('C')
  .action(function() {
    console.log('Checking highest bid')
  });

program
  .command('closeAuction')
  .alias('X')
  .action(function() {
    console.log('Auction ended')
  })

program.parse(process.argv)
