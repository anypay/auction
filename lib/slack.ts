require('dotenv').config();

import * as http from 'superagent';

export async function notifySlack(event, message): Promise<void> {

  if (!process.env.SLACK_URL) {

    return;

  }

  if (typeof message === 'object') {

    message = JSON.stringify(message);

  }

  let resp = await http.post(process.env.SLACK_URL).send({

    text: JSON.stringify({

      event,
      
      payload: message

    })

  });

}

