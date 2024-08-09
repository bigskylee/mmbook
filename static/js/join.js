function lengthcheck(value) {
    return value.length >= 4 && value.length <= 12
}
function nivaluecheck(nik) {
    return nik.length >= 2 && nik.length <= 12
}
function pwcheck(pw) {
    return pw.length >= 4 && pw.length <= 12
}
function pwandpwch(pw, pwch) {
    return pw == pwch
}

function idcheck(value) {
    return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(value)
}

function joincheck(id, pw, pwch, nik) {
    var count = 0
    if (lengthcheck(id)) {
        console.log('통과')
        count++
    } else {
        alert('id길이')
    }
    if (nivaluecheck(nik)) {
        console.log('통과')
        count++
    } else {
        alert('닉길이')
    }
    if (lengthcheck(pw)) {
        console.log('통과')
        count++
    } else {
        alert('비번길이')
    }
    if (pwandpwch(pw, pwch)) {
        console.log('통과')
        count++
    } else {
        alert('확인다름')
    }
    if (idcheck(id)) {
        console.log('통과')
        count++
    } else {
        alert('한글or특문')
    }

    return count == 5
}

document.getElementById('joinbutton').addEventListener('click', function () {
    const id = document.getElementById('id').value
    const pw = document.getElementById('pw').value
    const pwch = document.getElementById('pwch').value
    const nik = document.getElementById('nik').value

    if (joincheck(id, pw, pwch, nik)) {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', `/join/save`)
        const uname = document.createElement('input')
        uname.setAttribute('type', 'hidden')
        uname.setAttribute('name', 'id')
        uname.setAttribute('value', id)
        const upassword = document.createElement('input')
        upassword.setAttribute('type', 'hidden')
        upassword.setAttribute('name', 'pw')
        upassword.setAttribute('value', pw)
        const unik = document.createElement('input')
        unik.setAttribute('type', 'hidden')
        unik.setAttribute('name', 'unik')
        unik.setAttribute('value', nik)
        form.appendChild(uname)
        form.appendChild(upassword)
        form.appendChild(unik)
        document.body.appendChild(form)
        form.submit()
    }
})
