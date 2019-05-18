
import * as models from '../models';

import * as bch from 'bitcore-lib-cash';

import { sendEmail, sendBidderWelcomeEmail } from './mailer';

import { log } from './logger';

import * as http from 'superagent';

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

interface AuctionItemParams {

  auction_id: number;

  name: string;

  description?: string;

}

export async function addItemToAuction(params: AuctionItemParams) {

  let auctionItem = await models.AuctionItem.create(params);

  return auctionItem;

}

export async function getAddressBalance(address) {

  let resp = await http.get(`https://rest.bitcoin.com/v2/address/utxo/${address}`);

  return resp.body['utxos'].reduce((sum, utxo) => {

    return sum + utxo['amount'];
  
  }, 0);

}

interface BidderParams {

  participant_id: number;

  auction_item_id: number;

}

export async function createBidder(params: BidderParams) {

  let bidder = await models.AuctionItemBidder.create(params);

  log.info('bidder.created', bidder.toJSON());

  await sendBidderWelcomeEmail(bidder);

  return bidder;

}

export async function listAuctions() {

  return models.Auction.findAll();

}

export async function listAuctionItems(auction_id) {

  return models.AuctionItem.findAll({ where: {
  
    auction_id
    
  }});

}

export async function listAuctionParticipants(auction_id) {

  return models.Participant.findAll({ where: {
  
    auction_id
    
  }});

}

export async function listAuctionItemBidders(auction_item_id) {

  return models.AuctionItemBidder.findAll({ where: {
  
    auction_item_id
    
  }});

}

