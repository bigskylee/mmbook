const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1000',
    database: 'mmbook',
})

function join(id, pw, nik) {
    const joinsql = 'INSERT INTO user (uname,unum,unil)  VALUES (' + id + ',' + pw + ',' + nik + ')'
    db.query(joinsql, (err, result) => {
        console.log(err)
        console.log('success!')
    })
}

async function login(id, pw) {
    const loginsql = 'SELECT  * FROM user WHERE nname=' + id + ''
    db.query(loginsql, (err, result) => {
        console.log(err)
        console.log(result)
    })
}

module.exports = {
    login: login,
    join: join,
}
