const corrections = document.querySelectorAll('.correction')

document.getElementById('correbutton').addEventListener('click', function () {
    corrections.forEach((correction) => {
        correction.classList.add('Express')
    })
})

document.getElementById('complete').addEventListener('click', function () {
    const id = document.getElementById('id')
    const pw = document.getElementById('pw')
    const pwch = document.getElementById('pwch')
    const nik = document.getElementById('nik')

    if (joincheck(id, pw, pwch, nik)) {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', `/correction`)

        const ids = document.createElement('input')
        ids.setAttribute('type', 'hidden')
        ids.setAttribute('name', 'id')
        ids.setAttribute('value', id)
        const password = document.createElement('input')
        password.setAttribute('type', 'hidden')
        password.setAttribute('name', 'pw')
        password.setAttribute('value', pw)
        const passwordch = document.createElement('input')
        passwordch.setAttribute('type', 'hidden')
        passwordch.setAttribute('name', 'pwch')
        passwordch.setAttribute('value', pwch)
        const unik = document.createElement('input')
        unik.setAttribute('type', 'hidden')
        unik.setAttribute('name', 'nik')
        unik.setAttribute('value', nik)

        form.appendChild(ids)
        form.appendChild(password)
        form.appendChild(passwordch)
        form.appendChild(unik)
        document.body.appendChild(form)
        form.submit()
    }
})

document.getElementById('logout').addEventListener('click', function () {
    if (confirm('정말 로그아웃합니까?') == true) {
        //확인
        // document.form.submit()
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', `/logout`)

        document.body.appendChild(form)
        form.submit()
    } else {
        //취소
        return
    }
})
document.getElementById('delete').addEventListener('click', function () {
    if (confirm('정말 삭제합니까?') == true) {
        const id = document.getElementById('id').value
        console.log(id)
        //확인
        // document.form.submit()
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', `/userdelete`)

        const ids = document.createElement('input')
        ids.setAttribute('type', 'hidden')
        ids.setAttribute('name', 'id')
        ids.setAttribute('value', id)

        form.appendChild(ids)
        document.body.appendChild(form)
        form.submit()
    } else {
        //취소
        return
    }
})

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
        console.log('id길이')
    }
    if (nivaluecheck(nik)) {
        console.log('통과')
        count++
    } else {
        console.log('닉길이')
    }
    if (lengthcheck(pw)) {
        console.log('통과')
        count++
    } else {
        console.log('비번길이')
    }
    if (pwandpwch(pw, pwch)) {
        console.log('통과')
        count++
    } else {
        console.log('확인다름')
    }
    if (idcheck(id)) {
        console.log('통과')
        count++
    } else {
        console.log('한글or특문')
    }

    return count == 5
}
