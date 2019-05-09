# Auction
For Ross Is Free Auction At Porcfest 2019

This app is designed to allow users to participate in an online auction usig Bitcoin Cash.  Users can place bids on items currently available in the auction.  If a user has placed the highest bid, they have submitted payment, proving they are capable of actually paying the agreed amount.  When an agreed upon time runs out, the highest bid wins the item.  If another user places a higher bid before the time runs out, that user is now the highest bidder and the previous highest bidder is refunded their payment.  The users will be able to know at any given time if they are the highest bidder on an item.

Keeping users and bids as anonymous as possible is priority, though we will require a certain amount of confidential information to identify a user as a valid bidder and in some cases a shipping address.

The app will allow for international and global interaction.

-MVP-

Front end:
-Auction page with currently listed items, most important detail (eg. time left)
-Single product page with detailed description, photos, current highest bid

Back end:
-Payment processing for a bid
	-Accepting payment
	-Refunding payment
-Logic to define highest bidder/make 'ownership'
-Security concerns around personal information
