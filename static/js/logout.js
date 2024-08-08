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
