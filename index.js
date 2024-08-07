var express = require('express')
var router = express.Router()
var port = 3000
var path = require('path')
var app = express()
var axios = require('axios')
var aspose = aspose || {}
const fs = require('fs')
var cheerio = require('cheerio')
var request = require('request')
const session = require('express-session')
// aspose.cells = require('aspose.cells')
app.use(express.static('static'))
const cookieParser = require('cookie-parser')
const mysql = require('./static/js/mysql.js')
const login = require('./static/js/login.js')

app.use(
    session({
        secret: 'mmbook',
        resave: true,
        saveUninitialized: false,
    }),
)

function userchack(req, html) {
    if (req.session.user) {
        const userhtml = html.replace('<heders />', '<a href="/mysing">내음반</a><a href="/mypag">마이페이지</a>')
        return userhtml
    } else {
        const nouserhtml = html.replace(
            '<heders />',
            '<a href="/login">로그인</a><a href="/join" class="join">회원가입</a>',
        )
        return nouserhtml
    }
}

/* GET home page. */
app.get('/', async function (req, res, next) {
    const html = fs.readFileSync(__dirname + '/static/html/home.html', 'utf-8')
    const uhtml = userchack(req, html)
    res.send(uhtml)
})

app.use(express.urlencoded({ extended: false }))
app.get('/test', async function (req, res, next) {
    const crolling = require('./static/js/crolling.js')
    const surch = req.query.surch
    // res.send(surch)
    const device = req.query.device
    const condition = req.query.condition
    const inpage = req.query.page

    const turn = await crolling.dataColling(req, res, surch, device, condition, inpage)
    let result = turn[0] //txts.join('')
    let page = turn[1] //pages.join('')

    const fs = require('fs')
    const ahtml = fs.readFileSync(__dirname + '/static/html/mList.html', 'utf-8')
    const ahtml2 = ahtml.replace('<testsong />', '<div>' + result + '</div>')
    const shtml = ahtml2.replace('<pagelink />', '<div class="pagebox">' + page + '</div>')

    const uhtml = userchack(req, shtml)
    res.send(uhtml)

    // const html = path.resolve(__dirname + '/html/home.html')
})

app.post('/login/loginchack', async function (req, res, next) {
    try {
        // login.logins(req, res, next)
        const logins = await login.logins(req, res, next)
        if (logins.uname == 'admin') {
            req.session.user = logins
            res.redirect('/')
        } else if (logins == 'N') {
            console.log('로그인 실패')
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error)
    }
    // const html = path.resolve(__dirname + '/static/html/login.html')
    // res.sendFile(html)
})
app.get('/login', async function (req, res, next) {
    if (req.session.user) {
        const html = fs.readFileSync(__dirname + '/static/html/mList.html', 'utf-8')
        const uhtml = userchack(req, html)
        res.send(uhtml)
    } else {
        const html = fs.readFileSync(__dirname + '/static/html/login.html', 'utf-8')
        const uhtml = userchack(req, html)
        res.send(uhtml)
    }
})
app.get('/join', async function (req, res, next) {
    const html = fs.readFileSync(__dirname + '/static/html/join.html', 'utf-8')
    const uhtml = userchack(req, html)
    res.send(uhtml)
})
app.get('/mypag', async function (req, res, next) {
    if (req.session.user) {
        const html = fs.readFileSync(__dirname + '/static/html/mypag.html', 'utf-8')
        const mhtml1 = html.replace('<nik />', '<input type="text" value="' + req.session.user.unik + '">')
        const mhtml2 = mhtml1.replace('<id />', req.session.user.uname)
        const mhtml3 = mhtml2.replace('<pw />', req.session.user.upassword)
        const uhtml = userchack(req, mhtml3)
        res.send(uhtml)
    } else {
        const html = fs.readFileSync(__dirname + '/static/html/home.html', 'utf-8')
        const uhtml = userchack(req, html)
        res.send(uhtml)
    }
})

app.listen(port, () => {
    console.log('서버on port:3000')
})
// odule.exports = router
