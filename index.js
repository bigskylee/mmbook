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
// aspose.cells = require('aspose.cells')
app.use(express.static('static'))
const cookieParser = require('cookie-parser')

/* GET home page. */
app.get('/', async function (req, res, next) {
    const html = path.resolve(__dirname + '/static/html/home.html')

    res.sendFile(html)
})

app.use(express.urlencoded({ extended: false }))
app.get('/test', async function (req, res, next) {
    const crolling = require('./static/js/crolling.js')
    const surch = req.query.test
    // res.send(surch)
    const karaoke = req.query.karaoke
    const strtype = req.query.condition

    const turn = await crolling.dataColling(req, res, surch, karaoke, strtype)
    try {
        var number = 1
        var url =
            'https://www.tjmedia.com/tjsong/song_search_list.asp?strType=2&natType=&strText=' +
            surch +
            '&strCond=0&intPage='
        //String(surch.page)
        //console.log(surch.page)
        // var song = []
        // var pagechack = url + '1'
        // const numpage = await axios.get(pagechack)
        // var P = cheerio.load(numpage.data)
        // var numbers = 0
        // P('#page1').each((i, row) => {
        //     numbers = P(row).find('a').length
        //     console.log(numbers)
        // })
        // const pagen = req.query.page
        // var url2 = url + pagen
        // // while (chack == 1) {
        // const music = await axios.get(url2)
        // // const jsonmusic = JSON.parse(music.data)
        // var $ = cheerio.load(music.data)
        // $('#BoardType1').each((i, row) => {
        //     const musictrs = $(row).find('tr')
        //     // 예를 들어 첫 번째 td 요소만 가져오기
        //     var t = 1
        //     while (t <= 15) {
        //         wtexttr = $(musictrs[t]).find('td')
        //         mnumber = $(wtexttr[0]).text()
        //         mname = $(wtexttr[1]).text()
        //         msinger = $(wtexttr[2]).text()
        //         mcomposer = $(wtexttr[3]).text()
        //         mlyricist = $(wtexttr[4]).text()
        //         if (mnumber == '') {
        //             console.log('stop')
        //             break
        //         }
        //         console.log(mnumber, mname, msinger, mcomposer, mlyricist)
        //         song.push({
        //             mnumber: mnumber,
        //             mname: mname,
        //             msinger: msinger,
        //             mcomposer: mcomposer,
        //             mlyricist: mlyricist,
        //         })
        //         t++
        //     }
        // })
        // number++
        // var txts = []
        // for (let index = 0; index < song.length; index++) {
        //     txts.push(
        //         '<tr>' +
        //             '<td>' +
        //             ((pagen - 1) * 15 + index + 1) +
        //             '</td>' +
        //             '<td class="number">' +
        //             song[index]['mnumber'] +
        //             '</td>' +
        //             '<td>' +
        //             song[index]['mname'] +
        //             '</td>' +
        //             '<td>' +
        //             song[index]['msinger'] +
        //             '</td>' +
        //             '<td class="tablet">' +
        //             song[index]['mcomposer'] +
        //             '</td>' +
        //             '<td class="tablet">' +
        //             song[index]['mlyricist'] +
        //             '</td>' +
        //             '</tr>',
        //     )
        // }

        // var pages = []
        // for (let index = 1; index < numbers + 2; index++) {
        //     if (index == pagen) {
        //         pages.push('<div class="page">' + index + '</div>')
        //     } else {
        //         pages.push('<a href="test?test=' + surch + '&page=' + index + '">[' + index + ']</a>')
        //     }
        // }
    } catch (e) {
        console.error(e)
        res.send('에러')
    }
    let result = turn[0] //txts.join('')
    let page = turn[1] //pages.join('')

    const fs = require('fs')
    const ahtml = fs.readFileSync(__dirname + '/static/html/test.html', 'utf-8')
    const ahtml2 = ahtml.replace('<testsong />', '<div>' + result + '</div>')
    const shtml = ahtml2.replace('<pagelink />', '<div class="pagebox">' + page + '</div>')

    res.send(shtml)

    // const html = path.resolve(__dirname + '/html/home.html')
})

app.listen(port, () => {
    console.log('테스트중123')
})
// odule.exports = router
