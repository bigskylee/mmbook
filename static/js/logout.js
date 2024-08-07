document.getElementById('logout').addEventListener('click', function () {
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', `/logout`)

    document.body.appendChild(form)
    form.submit()
})
