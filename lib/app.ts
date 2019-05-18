
import * as lib from './';

import { log } from './logger';

import * as async from 'async';

var cron = require('node-cron');

let highestBidders = {};

export async function startAuction(auction) {

  var highestBidders = {};

  log.info('auction.starting', auction.toJSON());

  cron.schedule('* * * * *', async () => { //every minute

    let items = await lib.listAuctionItems(auction.id);

    items.map(async (item) => {

      let newHighestBidder = await getHighestBidderForItem(item.id);

      log.info('bidder.highest', newHighestBidder);

      if (newHighestBidder && !highestBidders[item.id]) {

        console.log('first highest bid placed', newHighestBidder);

        highestBidders[item.id] = newHighestBidder;

      } else if (newHighestBidder && highestBidders[item.id]) {

        if (newHighestBidder.balance > highestBidders[item.id].balance) {

          console.log('new highest bidder, refund the rest', newHighestBidder);

        }

      }

    });

  });

}

async function getHighestBidderForItem(item_id): Promise<any> {

  let bidderBalances = {}

  let bidders = await lib.listAuctionItemBidders(item_id);

  let balances = await Promise.all(bidders.map(async (bidder) => { 

    console.log("GET BIDDER BALANCE", bidder.toJSON());

    let balance = await lib.getAddressBalance(bidder.address);

    console.log("GOT BIDDER BALANCE", {

      bidder_id: bidder.id,

      balance
    
    });

    return {

      bidder_id: bidder.id,

      balance
    }

  }))

  console.log('RESULT', balances);

  return balances.sort((a,b) => {

    return a.balance > b.balance;

  })[0]);

}

