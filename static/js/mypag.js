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
