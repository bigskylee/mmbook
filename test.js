var express = require('express')
var router = express.Router()
var port = 3000
var path = require('path')
var app = express()
var axios = require('axios')
var aspose = aspose || {}
const fs = require('fs')
aspose.cells = require('aspose.cells')

app.get('/', async function (req, res, next) {
    const html = path.resolve(__dirname + '/html/home.html')

    //Set the license
    new aspose.cells.License().setLicense('License.lic')

    // Load the workbook
    var wb = new aspose.cells.Workbook('htmlS.html')

    // Create a range of all the cells on the sheet created from the HTML
    var lastCell = wb.getWorksheets().get(0).getCells().getLastCell()
    var range = wb
        .getWorksheets()
        .get(0)
        .getCells()
        .createRange(0, 0, lastCell.getRow() + 1, lastCell.getColumn() + 1)

    // Create a JsonSaveOptions class object
    var options = new aspose.cells.JsonSaveOptions()
    // Export JSON data to a string
    var data = aspose.cells.JsonUtility.exportRangeToJson(range, options)
    const fileName = 'htmlToJson.json'
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error('Error writing to the JSON file:', err)
        } else {
            console.log('JSON data has been written to the file successfully.')
        }
    })
    res.sendfile(html)
})
