document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal')
    const potup = document.getElementById('potup')
    document.querySelectorAll('.favorites').forEach((button) => {
        button.addEventListener('click', function () {
            const row = this.closest('tr')
            const cells = row.querySelectorAll('td')
            const rowData = Array.from(cells).map((cell) => cell.textContent)
            console.log(cells)
            console.log(rowData[1])
            console.log(rowData[2])
            console.log(rowData[3])
            console.log(rowData[4])
            console.log(rowData[5])

            fetch('/savesing', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    snum: rowData[1],
                    sname: rowData[2],
                    ssinger: rowData[3],
                    scomposer: rowData[4],
                    slyricist: rowData[5],
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data)
                    // 성공 시 추가 작업
                })
                .catch((error) => {
                    console.error('Error:', error)
                    potup.textContent = 'Failed to save data: ' + error.message
                    potup.className = 'status-message error'
                    modal.style.display = 'block'
                })
        })
    })
})
