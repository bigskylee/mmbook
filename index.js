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

/* GET home page. */
app.get('/', async function (req, res, next) {
    const html = path.resolve(__dirname + '/static/html/home.html')
    res.sendFile(html)
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
    const ahtml = fs.readFileSync(__dirname + '/static/html/test.html', 'utf-8')
    const ahtml2 = ahtml.replace('<testsong />', '<div>' + result + '</div>')
    const shtml = ahtml2.replace('<pagelink />', '<div class="pagebox">' + page + '</div>')

    res.send(shtml)

    // const html = path.resolve(__dirname + '/html/home.html')
})

app.post('/login/loginchack', async function (req, res, next) {
    console.log('++++++++++++++++')
    console.log(req.body)
    login.logins(req, res, next)
    const html = path.resolve(__dirname + '/static/html/login.html')
    res.sendFile(html)
})
app.get('/login', async function (req, res, next) {
    const html = path.resolve(__dirname + '/static/html/login.html')
    res.sendFile(html)
})
app.get('/join', async function (req, res, next) {
    const html = path.resolve(__dirname + '/static/html/join.html')
    res.sendFile(html)
})

app.listen(port, () => {
    console.log('테스트중123')
})
// odule.exports = router
