#!/usr/bin/env ts-node

require('dotenv').config();

//import { publish, awaitChannel } from '../lib/events';

import * as moment from 'moment';

import * as lib from '../lib';

import * as models from '../models';

import { log } from '../lib/logger';

const commander = require('commander')
const program = new commander.Command();
program
  .version('0.0.1')
  .description('Auction program')
  .parse(process.argv);

program
  .command('registerforauction <auction_name> <email>')
  .alias('U')
  .description('Add a new user.')
  .action(async function(name, email) {

    let auction = await models.Auction.findOne({ where: { name }});

    let registration = await lib.registerForAuction(auction.id, email)

    log.info('participant.created', registration.toJSON());

    //publish('participant.created', registration.toJSON());
    
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

program
  .command('createAuction <name>')
  .description('create an auction')
  .option('-s, --startdate', 'start date of auction')
  .option('-e, --enddate', 'end date of auction')
  .action(async function(name) {

    var start_date, end_date;

    if (program.startdate) {

      start_date = moment(program.startdate).toDate();

    }

    if (program.enddate) {

      start_date = moment(program.enddate).toDate();

    }

    let auction = await lib.createAuction({

      name,

      start_date,

      end_date

    });

    log.info('auction.created', auction.toJSON());

    //await awaitChannel();

    //publish('auction.created', auction.toJSON())

  })

program.parse(process.argv)

