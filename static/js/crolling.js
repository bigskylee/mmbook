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

async function dataColling(req, res, surch, device, condition, pagen) {
    // console.log(surch)
    const turn = []
    let conditionnum = null
    try {
        if (device == 'KY') {
            var frm = null
            //category= 검색 설정(통합 검색= [태그 제거],곡명=2 , 단일곡명=8, 가수=7, 곡번호=1, 작곡가=5 , 작사가=6 , 가사=4, LTS=11)
            if (condition == '제목') {
                conditionnum = '2'
                frm = '#search_chart_frm_2'
            } else if (condition == '가수') {
                conditionnum = '7'
                frm = '#search_chart_frm_7'
            }

            var song = []
            var url = 'https://kysing.kr/search/?category=' + conditionnum + '&keyword=' + surch + '&s_page='
            var pagechack = url + '1'
            const numpage = await axios.get(pagechack)
            var P = cheerio.load(numpage.data)
            var hrefs = []
            P('.search_chart_page_nav a').each((i, row) => {
                // let atags = P(row).find('a')
                // console.log(atags)
                // let atag = atags.hurl
                const href = P(row).attr('href')
                hrefs.push(href)
            })
            const endhref = hrefs[hrefs.length - 1]
            const href = endhref.match(/s_page=(\d+)/)
            const endpage = (sPageValue = href ? href[1] : '')
            // console.log(numpage.data)
            console.log(endpage)
            var url2 = url + pagen
            // while (chack == 1) {
            const music = await axios.get(url2)
            // const jsonmusic = JSON.parse(music.data)
            var $ = cheerio.load(music.data)
            $(frm).each((i, row) => {
                const musictrs = $(row).find('ul')
                var t = 1
                while (t <= 15) {
                    mnumber = $(musictrs[t]).find('.search_chart_num').text()
                    mname = $(musictrs[t]).find('.search_chart_tit').find('span').first().text()
                    msinger = $(musictrs[t]).find('.search_chart_sng').text()
                    mcomposer = $(musictrs[t]).find('.search_chart_cmp').text()
                    mlyricist = $(musictrs[t]).find('.search_chart_wrt').text()
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
                        '<td >' +
                        '<div class="favorites">추가</div>' +
                        '</td>' +
                        '</tr>',
                )
            }

            var pages = []
            var numbers = parseInt(endpage)
            var pgrup = Math.floor(pagen / 10)
            if (pagen > 10) {
                pages.push(
                    '<a href="/test/?surch=' +
                        surch +
                        '&device=' +
                        device +
                        '&condition=' +
                        condition +
                        '&page=' +
                        1 +
                        '"><<</a>',
                )
                pages.push(
                    '<a href="/test/?surch=' +
                        surch +
                        '&device=' +
                        device +
                        '&condition=' +
                        condition +
                        '&page=' +
                        (pgrup * 10 - 1) +
                        '"><</a>',
                )
            }
            for (let index = pgrup * 10 + 1; index < pgrup * 10 + 11; index++) {
                if (index == pagen) {
                    pages.push('<div class="page">' + index + '</div>')
                } else if (index > numbers) {
                    break
                } else {
                    pages.push(
                        '<a href="/test/?surch=' +
                            surch +
                            '&device=' +
                            device +
                            '&condition=' +
                            condition +
                            '&page=' +
                            index +
                            '">[' +
                            index +
                            ']</a>',
                    )
                }
            }
            if (numbers - pgrup > 10) {
                pages.push(
                    '<a href="/test/?surch=' +
                        surch +
                        '&device=' +
                        device +
                        '&condition=' +
                        condition +
                        '&page=' +
                        (pgrup * 10 + 11) +
                        '">></a>',
                )
                pages.push(
                    '<a href="/test/?surch=' +
                        surch +
                        '&device=' +
                        device +
                        '&condition=' +
                        condition +
                        '&page=' +
                        numbers +
                        '">>></a>',
                )
            }

            let result = txts.join('')
            let page = pages.join('')

            turn.push(result)
            turn.push(page)
        } else if (device == 'TJ') {
            //strType= 검색 타입(제목=1,가수=2,작사가=4,작곡가=8,곡번호=16,가사=32)\
            if (condition == '제목') {
                conditionnum = '1'
            } else if (condition == '가수') {
                conditionnum = '2'
            }

            var number = 1
            var url =
                'https://www.tjmedia.com/tjsong/song_search_list.asp?strType=' +
                conditionnum +
                '&natType=&strText=' +
                surch +
                '&strCond=0&intPage='
            //String(surch.page)
            //console.log(surch.page)
            var song = []
            var numbers = 0
            var url2 = url + pagen
            // while (chack == 1) {
            const music = await axios.get(url2)
            // const jsonmusic = JSON.parse(music.data)
            var $ = cheerio.load(music.data)
            $('#page1').each((i, row) => {
                numbers = $(row).find('a').length
            })
            $('#BoardType1').each((i, row) => {
                const musictrs = $(row).find('tr')
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
                        '<td >' +
                        '<div class="favorites">추가</div>' +
                        '</td>' +
                        '</tr>',
                )
            }

            var pages = []
            var pgrup = Math.floor(pagen / 10)
            if (pagen > 10) {
                pages.push(
                    '<a href="/test/?surch=' +
                        surch +
                        '&device=' +
                        device +
                        '&condition=' +
                        condition +
                        '&page=' +
                        (pgrup * 10 - 1) +
                        '"><</a>',
                )
            }
            for (let index = pgrup * 10 + 1; index < numbers + pgrup * 10 + 2 && index < pgrup * 10 + 11; index++) {
                if (index == pagen) {
                    pages.push('<div class="page">' + index + '</div>')
                } else {
                    pages.push(
                        '<a href="/test/?surch=' +
                            surch +
                            '&device=' +
                            device +
                            '&condition=' +
                            condition +
                            '&page=' +
                            index +
                            '">[' +
                            index +
                            ']</a>',
                    )
                }
            }
            console.log(numbers)
            if ((pagen < 11 && numbers > 9) || (pagen > 10 && numbers > 10)) {
                console.log('화살표 테스트')
                pages.push(
                    '<a href="/test/?surch=' +
                        surch +
                        '&device=' +
                        device +
                        '&condition=' +
                        condition +
                        '&page=' +
                        (pgrup * 10 + 11) +
                        '">></a>',
                )
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
    dataColling: dataColling,
}
