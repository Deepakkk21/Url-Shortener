document.addEventListener('DOMContentLoaded', function () {

    fetch('/user/homepage/data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        // Update the table with the fetched data
        updateTable(data.urls);
    })
    .catch(error => console.error('Error:', error));
});

function updateTable(urls) {
    const tableBody = document.getElementById('urlTableBody');

    urls.forEach(url => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.innerHTML = url.originalUrl;
        cell2.innerHTML = `<a href="${url.shortUrl}" target="_blank"> http://localhost:8000/user/${url.shortUrl}</a>`;
        cell3.innerHTML = url.clicks;
    });
}