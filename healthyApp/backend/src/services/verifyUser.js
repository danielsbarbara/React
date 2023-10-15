const { CheckUser } = require('../data/CRUD')

async function verifyUser(user) {
    const userAlreadyExists = await CheckUser(user)
    if(userAlreadyExists.user === user) return false
    return true
}

module.exports = {verifyUser}