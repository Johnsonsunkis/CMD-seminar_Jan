let participants = [];

// 1. Load the JSON data
fetch('participants_2.json')
    .then(res => res.json())
    .then(data => {
        participants = data;
        const tbody = document.getElementById('table-body');
        
        data.forEach(p => {
            const row = document.createElement('tr');
            row.id = "row-" + p.ID; 
            row.innerHTML = `
                <td>${p.ID}</td>
                <td>${p.Name}</td>
                <td>${p["__1"] || ""}</td>
                <td><span class="status-dot"></span> <span class="status-text">Wait</span></td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(err => console.error("Could not load JSON. Check if participants_2.json exists."));

// 2. Scan Success Logic
function onScanSuccess(decodedText) {
    const scanResult = decodedText.trim();
    const person = participants.find(p => p["Combined (A+B+C)"].trim() === scanResult);

    if (person) {
        const row = document.getElementById("row-" + person.ID);
        if (row) {
            row.classList.add('checked-in');
            row.querySelector('.status-text').innerText = "In";
            alert("Success: " + person.Name);
        }
    } else {
        alert("Not found: " + scanResult);
    }
}

// 3. Start Camera
function startScanner() {
    document.getElementById('start-btn').style.display = 'none';
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
    scanner.render(onScanSuccess);
}