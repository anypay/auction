
import * as assert from 'assert';

import { createAuction } from '../lib';

describe("Register For Auction", () => {

  var auction;

  before(async function() {

    let name = await chance.name();

    auction = await createAuction(name);

  })

  it("should register a user by email address for an auction", async () => {

    let email = chance.email()

    let registration = await auction.registerEmail(email);

    assert(registration.bitcoin_cash_address);
    assert(registration.email_address);
    assert(registration.id > 0);

  });


});
