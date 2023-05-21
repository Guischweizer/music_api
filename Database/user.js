const knex = require('../db')
const uuid = require('uuid')

const fetchUser = async (email) => {
    return knex('users').where('email', '=', email).first()
}

const updateUserToken = async (email, token) => {
    return knex('users').where('email', '=', email).update('token', token)
}
const createUser = async (
    firstName,
    lastName,
    email,
    encryptedUserPassword,
) => {
    return knex('users').insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: encryptedUserPassword,
    })

}

module.exports = {
    fetchUser,
    createUser,
    updateUserToken
}