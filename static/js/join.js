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
    if (lengthcheck(id)) {
        console.log('통과')
    } else {
        console.log('id길이')
    }
    if (nivaluecheck(nik)) {
        console.log('통과')
    } else {
        console.log('닉길이')
    }
    if (lengthcheck(pw)) {
        console.log('통과')
    } else {
        console.log('비번길이')
    }
    if (pwandpwch(pw, pwch)) {
        console.log('통과')
    } else {
        console.log('확인다름')
    }
    if (idcheck(id)) {
        console.log('통과')
    } else {
        console.log('한글or특문')
    }
}

document.getElementById('joinbutton').addEventListener('click', function () {
    const id = document.getElementById('id').value
    const pw = document.getElementById('pw').value
    const pwch = document.getElementById('pwch').value
    const nik = document.getElementById('nik').value

    if (joincheck(id, pw, pwch, nik)) {
        // const form = document.createElement('form')
        // form.setAttribute('method', 'post')
        // form.setAttribute('action', `/res/${raid}/${pk}`)
        // const uname = document.createElement('input')
        // Raid.setAttribute('type', 'hidden')
        // Raid.setAttribute('name', 'id')
        // Raid.setAttribute('value', raid)
        // const upassword = document.createElement('input')
        // Atia.setAttribute('type', 'hidden')
        // Atia.setAttribute('name', 'pw')
        // Atia.setAttribute('value', data[0])
        // const unik = document.createElement('input')
        // Btia.setAttribute('type', 'hidden')
        // Btia.setAttribute('name', 'unik')
        // Btia.setAttribute('value', data[1])
        // form.appendChild(uname)
        // form.appendChild(upassword)
        // form.appendChild(unik)
        // document.body.appendChild(form)
        // form.submit()
    }
})
