
import * as models from '../models';

import * as bch from 'bitcore-lib-cash';

import { sendEmail } from './mailer';

interface AuctionParams {

  name: string;

  start_date?: Date;

  end_date?: Date;

}

export async function createAuction(params: AuctionParams) {

  return models.Auction.create(params);

}

export async function registerForAuction(auction_id: number, email: string) {

  let privateKey = new bch.PrivateKey();

  let address = privateKey.toAddress().toString();

  let participant = await models.Participant.create({

    email,

    auction_id,

    address,

    private_key: privateKey.toWIF()

  });

  sendEmail(participant);

  return participant;

}

