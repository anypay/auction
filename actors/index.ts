
import { Actor } from 'bunnies';

import { connect } from 'amqplib';

import { notifySlack } from '../lib/slack'

require('dotenv').config();

(async () => {

  Actor.create({

    exchange: 'auction.anypay.global',

    routingkey: 'bid.placed',

    queue: 'logbidplaced',

  })
  .start();

  Actor.create({

    exchange: 'auction.anypay.global',

    routingkey: 'user.added',

    queue: 'loguseradded'

  })
  .start(async (channel, msg) => {

    notifySlack('user.added', msg.content.toString());
  
  });

  Actor.create({

    exchange: 'auction.anypay.global',

    routingkey: 'auction.started',

    queue: 'logauctionstarted',

  })
  .start();

  Actor.create({

    exchange: 'auction.anypay.global',

    routingkey: 'auction.ended',

    queue: 'logauctionended',

  })
  .start()

  Actor.create({

    exchange: 'auction.anypay.global',

    routingkey: 'item.added',

    queue: 'logitemadded',

  })
  .start()

  Actor.create({

    exchange: 'auction.anypay.global',

    routingkey: 'bid.returned',

    queue: 'logbidreturned',

  })
  .start()

})();

