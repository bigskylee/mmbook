const mysql = require('mysql')
const express = require('express')
const session = require('express-session')

var app = express()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1000',
    database: 'mmbook',
})

async function login(id, pw) {
    return new Promise((resolve, reject) => {
        const loginsql = 'SELECT  * FROM user WHERE uname="' + id + '"'
        db.query(loginsql, (err, result) => {
            if (result[0].upassword == String(pw)) {
                return resolve(result[0])
            } else {
                console.log('실패')
                return resolve('N')
            }
        })
    })
}

async function logins(req, res, next) {
    return new Promise(async (resolve, reject) => {
        const id = req.body.id
        const pw = req.body.password
        const user = await login(id, pw)
        return resolve(user)
    })
}

module.exports = {
    login: login,
    logins: logins,
}
