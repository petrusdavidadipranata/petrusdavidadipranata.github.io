const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
let names = [];
let angles = [];
let startAngle = 0;
let spinTimeout = null;
let spinAngle = 0;
let spinAngleIncrement = 0;
let isSpinning = false;

function addName() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    if (name && !names.includes(name)) {
        names.push(name);
        nameInput.value = '';
        updateNameList();
        drawWheel();
    } else if (!name) {
        Swal.fire('Error', 'Please enter a valid name!', 'error');
    } else {
        Swal.fire('Warning', 'Name already exists!', 'warning');
    }
}

function updateNameList() {
    const nameListDiv = document.getElementById('nameList');
    nameListDiv.innerHTML = ''; // Clear existing names

    names.forEach((name, index) => {
        const nameDiv = document.createElement('div');
        nameDiv.className = 'd-flex justify-content-between align-items-center mb-2';
        nameDiv.innerHTML = `
            <span>${name}</span>
            <button class="btn btn-danger btn-sm" onclick="removeName(${index})">Hapus</button>
        `;
        nameListDiv.appendChild(nameDiv);
    });
}

function removeName(index) {
    names.splice(index, 1); // Remove the name from array
    updateNameList(); // Update the display
    drawWheel(); // Redraw the wheel without the removed name
}

function drawWheel() {
    const arcSize = (2 * Math.PI) / names.length;
    angles = [];

    // Array warna untuk setiap bagian roda
    const colors = ['#f39c12', '#e74c3c', '#8e44ad', '#3498db', '#2ecc71', '#f1c40f', '#f2ea'];

    // Bersihkan canvas sebelum menggambar ulang roda
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < names.length; i++) {
        const angle = startAngle + i * arcSize;
        angles.push(angle);

        ctx.beginPath();
        ctx.moveTo(250, 250); // Titik tengah roda
        ctx.arc(250, 250, 250, angle, angle + arcSize, false);
        
        // Menggunakan warna dari array secara berurutan
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.stroke();

        // Gambar teks di setiap bagian roda
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(angle + arcSize / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(names[i], 240, 10);
        ctx.restore();
    }

    // Gambar anak panah setelah roda
    drawArrow();
}

function drawArrow() {
    // Set lokasi anak panah di atas roda
    ctx.beginPath();
    ctx.moveTo(250, 10); // Titik awal anak panah di tengah atas
    ctx.lineTo(240, 40); // Garis ke sisi kiri
    ctx.lineTo(260, 40); // Garis ke sisi kanan
    ctx.closePath(); // Kembali ke titik awal untuk membentuk segitiga
    ctx.fillStyle = '#f7f7f7'; // Warna merah untuk anak panah
    ctx.fill();
}


function spin() {
    if (isSpinning) return;

    if (names.length === 0) {
        Swal.fire('Error', 'Add at least one name to spin the wheel!', 'error');
        return;
    }

    spinAngleIncrement = Math.random() * 20 + 20;
    spinAngle = Math.random() * 360;
    isSpinning = true;
    rotateWheel();
}

function rotateWheel() {
    startAngle += (spinAngleIncrement * Math.PI) / 180;
    drawWheel();

    spinAngleIncrement *= 0.98;
    if (spinAngleIncrement > 0.2) {
        spinTimeout = setTimeout(rotateWheel, 30);
    } else {
        isSpinning = false;
        const index = Math.floor((startAngle % (2 * Math.PI)) / ((2 * Math.PI) / names.length));
        const selectedName = names[index];

        Swal.fire({
            title: `Selamat ${selectedName} !!!`,
            text: `Pemenangnya adalah ${selectedName}`,
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonText: 'Batal',
            reverseButtons: true,
            confirmButtonText: 'Ok, Hapus'
        }).then((result) => {
            if (result.isConfirmed) {
                removeName(index);
                Swal.fire({
                    title: "Dihapus!",
                    text: `${selectedName} berhasil dihapus`,
                    icon: "success"
                  });
            }
            // Hapus nama pemenang setelah pemilihan

        });
    }
}
