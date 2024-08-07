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
    console.log(id)
    console.log(pw)
    return new Promise((resolve, reject) => {
        const loginsql = 'SELECT  * FROM user WHERE uname=?'
        db.query(loginsql, [id], (err, result) => {
            console.log(result)
            console.log(result[0])
            if (result[0].upassword == String(pw)) {
                console.log('login')
                return resolve(result[0])
            } else {
                console.log('login실패')
            }
        })
    })
}

async function logins(req, res, next) {
    return new Promise(async (resolve, reject) => {
        const id = req.body.id
        const pw = req.body.password
        const user = await login(id, pw)
        console.log(user)
        console.log('logins')
        return resolve(user)
    })
}

async function join(req, res, next) {
    const id = req.body.id
    const pw = req.body.pw
    const unik = req.body.unik
    const joinsql = 'INSERT INTO user (uname,upassword,unik)  VALUES (?,?,?)'
    db.query(joinsql, [id, pw, unik], (err, result) => {
        if (err) {
            console.error('Error occurred:', err)
        }
        console.log('Success!')
    })
}

module.exports = {
    login: login,
    logins: logins,
    join: join,
}
