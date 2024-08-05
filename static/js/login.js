const mysql = require('mysql')
const session = require('express-session')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1000',
    database: 'mmbook',
})

async function login(id, pw) {
    const loginsql = 'SELECT  * FROM user WHERE uname="' + id + '"'
    db.query(loginsql, (err, result) => {
        console.log(err)
        console.log(result)
        console.log(result[0].upassword)
        if (result[0].upassword == String(pw)) {
            console.log('성공!')
            res.redirect('/login')
        } else {
            console.log('실패')
            res.redirect('/login')
        }
    })
}

function logins(req, res, next) {
    const id = req.body.id
    console.log(id)
    const pw = req.body.password
    console.log(pw)
    login(id, pw)
}

module.exports = {
    login: login,
    logins: logins,
}
