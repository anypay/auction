const db = require('../db')
const { User, Auction, Item, Bid } = require('../db/models')

async function seed () {
  await db.sync({force: true})
  console.log('Database synced!')
  
  const users = await Promise.all([
    User.create({
      name: 'DJ',
      email: 'DJ@email.com'
    }),
    User.create({
      name: 'Somebody Else',
      email: 'smbdy@email.com'
    })
  ])
  
  const items = await Promise.all([
    Item.create({
      name: 'Tickets',
      description: 'Two tickets to a Broadway show.',
      photos: ['photo1', 'photo2']
    }),
    Item.create({
      name: 'Car',
      description: 'A sick new ride.',
      photos: ['photo1', 'photo2']
    })
  ])
}

async function runSeed () {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

module.exports = seed
