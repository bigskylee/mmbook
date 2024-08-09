document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.favorites').forEach((button) => {
        button.addEventListener('click', function () {
            const row = this.closest('tr')
            const cells = row.querySelectorAll('td')
            const rowData = Array.from(cells).map((cell) => cell.textContent)
            console.log(cells)
            console.log(rowData)
        })
    })
})
