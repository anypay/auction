const { User } = require('../db/models')

async function addUser (name, email)  {
  try {
    await User.create({
      name,
      email
    })
  } catch(err) {
    console.error(err)
  }
}

module.exports = addUser
