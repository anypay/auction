
import * as aws from 'aws-sdk';

import * as models from '../models';

let ses = new aws.SES({ region: 'us-east-1' });

export async function sendEmail(participant) {

  var params = {
    Destination: { /* required */
      CcAddresses: [
      ],
      ToAddresses: [
        participant.email
      ]
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
         Charset: "UTF-8",
         Data: `send BCH here to bid ${participant.address}`
        },
        Text: {
         Charset: "UTF-8",
         Data: `send BCH here to bid ${participant.address}`
        }
       },
       Subject: {
        Charset: 'UTF-8',
        Data: 'Registered for Auction'
       }
      },
    Source: 'auctions@anypay.global',
    ReplyToAddresses: [
    ]
  };

  return ses.sendEmail(params).promise();

}

export async function sendBidderWelcomeEmail(bidder) {

  let auctionItem = await models.AuctionItem.findOne({
    where: { id: bidder.auction_item_id }
  });

  let participant = await models.Participant.findOne({
    where: { id: bidder.participant_id }
  });

  var params = {
    Destination: { /* required */
      CcAddresses: [
      ],
      ToAddresses: [
        participant.email
      ]
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
         Charset: "UTF-8",
         Data: `send BCH here to bid ${bidder.address}`
        },
        Text: {
         Charset: "UTF-8",
         Data: `send BCH here to bid ${bidder.address}`
        }
       },
       Subject: {
        Charset: 'UTF-8',
        Data: `Auction of ${auctionItem.name}`
       }
      },
    Source: 'auctions@anypay.global',
    ReplyToAddresses: [
    ]
  };

  return ses.sendEmail(params).promise();

}

