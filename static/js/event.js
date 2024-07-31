document.getElementById('tjbutton').addEventListener('click', function () {
    var surch = document.getElementById('surch').value
    var device = this.innerText
    var condition = document.getElementById('condition').value
    var page = document.getElementById('page').value

    var url = '/test/?surch=' + surch + '&device=' + device + '&condition=' + condition + '&page=' + page

    window.location.href = url
})

document.getElementById('kybutton').addEventListener('click', function () {
    var surch = document.getElementById('surch').value
    var device = this.innerText
    var condition = document.getElementById('condition').value
    var page = document.getElementById('page').value

    var url = '/test/?surch=' + surch + '&device=' + device + '&condition=' + condition + '&page=' + page

    window.location.href = url
})
