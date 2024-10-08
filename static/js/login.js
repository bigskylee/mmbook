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

async function savesing(req, res, next, uname) {
    console.log(req.body)
    const snum = req.body.snum
    const sname = req.body.sname
    const ssinger = req.body.ssinger
    const scomposer = req.body.scomposer
    const slyricist = req.body.slyricist

    const savesql = 'INSERT INTO sing (snum,username,sname,ssinger,scomposer,slyricist)  VALUES (?,?,?,?,?,?)'
    db.query(savesql, [snum, uname, sname, ssinger, scomposer, slyricist], (err, result) => {
        if (err) {
            console.error('Error occurred:', err)
            return false
        } else {
            console.log('Success!')
            return true
        }
    })
}



async function mysingselect(req, res, next, uname) {
    return new Promise((resolve, reject) => {
        const singselsql='select * from sing where username=?'
        db.query(singselsql,[uname],(err,result)=>{
            if(err){
                console.log(err)
            }else{  
                const maxpage=Math.floor(result.length/15)+1
                const page=req.query.page
                console.log(result)
                var sings=[]
                for (var index=(page-1)*15;index<(page-1)*15+15&&index<result.length;index++){
                    console.log('for문안 : '+result[index])
                    sings.push(
                        '<tr>'+
                        '<td>TJ</td>'
                        +
                        '<td>'+
                        result[index].snum +
                        '</td>'+
                        '<td>'+
                        result[index].sname+
                        '</td>'+
                        '<td>'+
                        result[index].ssinger+
                        '</td>'+
                        '<td class="tablet">'+
                        result[index].scomposer+
                        '</td>'+
                        '<td class="tablet">'+
                        result[index].slyricist+
                        '</td>'+
                        '<td >' +
                        '<div class="favorites">추가</div>' +
                        '</td>' +'</tr>'
                    )
                } 
                console.log(sings)

                var pages=[]
                var pgrup = Math.floor(page / 10)
                if (page > 10) {
                    pages.push(
                        '<a href="/mysing/?page=' +
                            1 +
                            '"><<</a>',
                    )
                    pages.push(
                        '<a href="/mysing/?page=' +
                            (pgrup * 10 - 1) +
                            '"><</a>',
                    )
                }
                for (let index = pgrup * 10 + 1; index < pgrup * 10 + 11; index++) {
                    if (index == page) {
                        pages.push('<div class="page">' + index + '</div>')
                    } else if (index > maxpage) {
                        break
                    } else {
                        pages.push(
                            '<a href="/mysing/?page=' +
                                index +
                                '">[' +
                                index +
                                ']</a>',
                        )
                    }
                }
                if (maxpage - pgrup > 10) {
                    pages.push(
                        '<a href="/mysing/?page=' +
                            (pgrup * 10 + 11) +
                            '">></a>',
                    )
                    pages.push(
                        '<a href="/mysing/?page=' +
                            maxpage +
                            '">>></a>',
                    )
                }
                const mysings={'sings':sings, 'pages':pages }
                console.log("sings : "+sings)
                console.log("pages : "+pages)
                console.log("mysings : "+mysings)
                return resolve(mysings)
            }
        })
    })
}


module.exports = {
    login: login,
    logins: logins,
    join: join,
    userdelete: userdelete,
    correction: correction,
    savesing: savesing,
    mysingselect:mysingselect
}
