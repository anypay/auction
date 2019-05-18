#!/usr/bin/env ts-node

require('dotenv').config();

//import { publish, awaitChannel } from '../lib/events';

import * as moment from 'moment';

import * as lib from '../lib';

import { startAuction } from '../lib/app';

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
  .command('listauctions')
  .action(async () => {

    let auctions = await lib.listAuctions();

    auctions.forEach(auction => {

      log.info('auction', auction.toJSON());

    });

    process.exit(0);

  })

program
  .command('listauctionitems <auction_name>')
  .action(async (name) => {

    let auction = await models.Auction.findOne({ where: { name }}); 

    let auctionItems = await lib.listAuctionItems(auction.id);

    console.log("auctionItems");

    auctionItems.forEach(item => {

      log.info('auction item', item.toJSON());

    });

    process.exit(0);

  })

program
  .command('createbidder <auction_name> <item_name> <email>')
  .description('create a bidder for an item in an auction')
  .action(async function(auction_name, item_name, email) {

    let participant = await models.Participant.findOne({ where: { email }});

    let auction = await models.Auction.findOne({ where: {
      name: auction_name
    }});

    let auctionItem = await models.AuctionItem.findOne({ where: {

      auction_id: auction.id,

      name: item_name

    }});

    let bidder = await lib.createBidder({

      auction_item_id: auctionItem.id,

      participant_id: participant.id
    })

    log.info('bidder.created', bidder.toJSON());
    
  });

program
  .command('removeUser')
  .alias('RU')
  .description('Remove a user.')
  .action(function() {
    console.log('Removing user')
  })

program
  .command('additemtoauction <auction_name> <item_name> [item_description]')
  .alias('I')
  .description('Add an auction item.')
  .action(async function(auction_name, name, description) {

    let auction_id = (await models.Auction.findOne({ where: {
      name: auction_name
    }}))['id'];

    let item = await lib.addItemToAuction({
      auction_id,
      name,
      description
    });

    log.info('item.added', item.toJSON());

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

program
  .command('getaddressbalance <bch_address>')
  .description('get bitcoin cash balance for an address')
  .action(async (address) => {

    let balance = await lib.getAddressBalance(address);

    log.info('address.balance', {

      address,

      balance

    });

    process.exit(0);

  });

program
  .command('startauction <name>')
  .description('start an auction')
  .action(async (name) => {

    let auction = await models.Auction.findOne({ where: { name }});

    startAuction(auction);

    log.info('auction.started', name);

  });

program.parse(process.argv)

