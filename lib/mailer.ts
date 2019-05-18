
import * as aws from 'aws-sdk';

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
