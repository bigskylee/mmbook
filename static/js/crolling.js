var express = require('express')
var router = express.Router()
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

async function dataColling(req, res, surch, device, condition) {
    // res.send(surch)
    console.log(surch)
    const turn = []
    try {
        if (device == 'ky') {
            //category= 검색 설정(통합 검색= [태그 제거],곡명=2 , 단일곡명=8, 가수=7, 곡번호=1, 작곡가=5 , 작사가=6 , 가사=4, LTS=11)
            if (condition == '제목') {
                condition = '2'
            } else if (condition == '가수') {
                condition = '7'
            }

            var url = 'https://kysing.kr/search/?category=' + condition + '&keyword=' + surch
        } else if (device == 'tj') {
            //strType= 검색 타입(제목=1,가수=2,작사가=4,작곡가=8,곡번호=16,가사=32)\
            if (condition == '제목') {
                condition = '1'
            } else if (condition == '가수') {
                condition = '2'
            }

            var number = 1
            var url =
                'https://www.tjmedia.com/tjsong/song_search_list.asp?strType=' +
                condition +
                '&natType=&strText=' +
                surch +
                '&strCond=0&intPage='
            //String(surch.page)
            //console.log(surch.page)
            var song = []
            var pagechack = url + '1'
            const numpage = await axios.get(pagechack)
            var P = cheerio.load(numpage.data)
            var numbers = 0
            P('#page1').each((i, row) => {
                numbers = P(row).find('a').length
            })
            const pagen = req.query.page
            var url2 = url + pagen
            // while (chack == 1) {
            const music = await axios.get(url2)
            // const jsonmusic = JSON.parse(music.data)
            var $ = cheerio.load(music.data)
            $('#BoardType1').each((i, row) => {
                const musictrs = $(row).find('tr')
                // 예를 들어 첫 번째 td 요소만 가져오기
                var t = 1
                while (t <= 15) {
                    wtexttr = $(musictrs[t]).find('td')
                    mnumber = $(wtexttr[0]).text()
                    mname = $(wtexttr[1]).text()
                    msinger = $(wtexttr[2]).text()
                    mcomposer = $(wtexttr[3]).text()
                    mlyricist = $(wtexttr[4]).text()
                    if (mnumber == '') {
                        console.log('stop')
                        break
                    }
                    song.push({
                        mnumber: mnumber,
                        mname: mname,
                        msinger: msinger,
                        mcomposer: mcomposer,
                        mlyricist: mlyricist,
                    })
                    t++
                }
            })
            number++
            var txts = []
            for (let index = 0; index < song.length; index++) {
                txts.push(
                    '<tr>' +
                        '<td>' +
                        ((pagen - 1) * 15 + index + 1) +
                        '</td>' +
                        '<td class="number">' +
                        song[index]['mnumber'] +
                        '</td>' +
                        '<td>' +
                        song[index]['mname'] +
                        '</td>' +
                        '<td>' +
                        song[index]['msinger'] +
                        '</td>' +
                        '<td class="tablet">' +
                        song[index]['mcomposer'] +
                        '</td>' +
                        '<td class="tablet">' +
                        song[index]['mlyricist'] +
                        '</td>' +
                        '</tr>',
                )
            }

            var pages = []
            for (let index = 1; index < numbers + 2; index++) {
                if (index == pagen) {
                    pages.push('<div class="page">' + index + '</div>')
                } else {
                    pages.push('<a href="test?test=' + surch + '&page=' + index + '">[' + index + ']</a>')
                }
            }

            let result = txts.join('')
            let page = pages.join('')

            turn.push(result)
            turn.push(page)
        }
        return turn
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    dataColling: dataColling, // dataColling 함수를 exports에 추가
}
