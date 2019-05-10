
import { getConnection } from 'bunnies';

var channel;

var channelIsConnected = false;

const exchange = 'auction.anypay.global';

export async function publish(routingkey, message) {

  if (typeof message === 'object') {

    message = JSON.stringify(message);

  }

  let buffer = new Buffer(message); 

  let channel = await awaitChannel();

  await channel.publish(exchange, routingkey, buffer);

}

async function awaitChannel() {

  while (!channelIsConnected) {

    await wait(100);

  }

  return channel;

}

(async function() {

  let connection = await getConnection();
 
  channel = await connection.createChannel();  

  channelIsConnected = true;
  
})();

function wait(ms) {

  return new Promise((resolve, reject) => {

    setTimeout(resolve, ms);

  });

}
 
