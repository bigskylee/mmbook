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
        const loginsql = 'SELECT  * FROM user WHERE uname=?'
        db.query(loginsql, [id], (err, result) => {
            if (result.length === 0) {
                return resolve('N')
            }
            console.log(result)
            console.log(result[0])
            if (result[0].upassword == String(pw)) {
                console.log('login')
                return resolve(result[0])
            } else {
                console.log('login실패')
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
        console.log(user)
        console.log('logins')
        return resolve(user)
    })
}

async function join(req, res, next) {
    return new Promise((resolve, reject) => {
        const id = req.body.id
        const pw = req.body.pw
        const unik = req.body.unik
        const joinsql = 'INSERT INTO user (uname,upassword,unik)  VALUES (?,?,?)'
        db.query(joinsql, [id, pw, unik], (err, result) => {
            if (err) {
                console.error('Error occurred:', err)
                return resolve(false)
            } else {
                console.log('Success!')
                return resolve(true)
            }
        })
    })
}

async function userdelete(req, res, next) {
    const id = req.body.id
    console.log(id)
    const deletesql = 'DELETE FROM user WHERE uname = ?'
    db.query(deletesql, [id], (err, result) => {
        if (err) {
            console.error('Error occurred:', err)
        }
        console.log('Success!')
    })
}

async function correction(req, res, next) {
    const id = req.body.id
    const pw = req.body.password
    const nik = req.body.nik

    const updatesql = 'UPDATE user SET upassword = ?,unik=?  WHERE uname = ?'
    db.query(updatesql, [pw, nik, id], (err, result) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
    login: login,
    logins: logins,
    join: join,
    userdelete: userdelete,
    correction: correction,
}
