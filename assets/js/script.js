const btnPlay = document.querySelector('#button .mulai');
const messege1 = document.querySelector('.messege-box1');
const messege2 = document.querySelector('.messege-box2');
const messege2P = document.querySelector('.messege-box2 .pesan p');
const hilang1 = document.querySelector('.hilang1');
const hilang2 = document.querySelector('.hilang2');
const nama = document.querySelectorAll('.nama h2')[0];
const nama1 = document.querySelectorAll('.nama h2')[1];
const waktu = document.getElementById('waktu');
const jam = waktu.querySelector('h1');
const hari = waktu.querySelector('p');
const body = document.querySelector('.body');
const audio = document.querySelector('.audio');
const audio2 = document.querySelector('.audio2'); // Tambahan untuk audio kedua
audio.volume = 0.4
body.classList.add('background1');

const date = new Date();
const hour = String(date.getHours()).padStart(2, '0');
const minutes = String(date.getMinutes()).padStart(2, '0');
const day = date.getDay();
const tgl = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

hari.innerHTML = `${dayID()}, ${tgl} ${monthID()} ${year}`;
jam.innerHTML = `${hour}:${minutes}`;

// Dirubah 
const pengirim = "Pzdaprnt🤍";
const nomorWa = "6283168740700"; // awalan nomor 0 harus di awalin 62
const textWa = "Ah bisa aja kamu";

if (pengirim) {
  nama.innerHTML = pengirim;
  nama1.innerHTML = pengirim;
} else {
  nama.innerHTML = "Nama Kamu";
  nama1.innerHTML = "Nama Kamu";
}

btnPlay.addEventListener('click', () => {
  audio.play();
  messege1.style.display = "block";
  messege1.style.transform = "translateX(0)";
  btnPlay.style.display = "none";
  hilang1.style.display = "block";
});

hilang1.addEventListener('click', () => {
  messege1.style.display = "none";
  messege2.style.transform = "translateX(0)";
  hilang1.style.display = "none";
  hilang2.style.display = "block";
  Swal.fire({
    imageUrl: "/assets/img/stiker_mylove.gif",
    imageHeight: 120,
    title: 'Hai sayangggg, Coba tebak hari ini tanggal berapa?',
    html: `<input type="date" id="login" class="swal2-input" placeholder="Masukkan tanggal di sini">`,
    confirmButtonText: 'Kirim',
    focusConfirm: false,
    preConfirm: () => {
      const login = Swal.getPopup().querySelector('#login').value;
      if (!login) {
        Swal.showValidationMessage(`Masukkan tanggal dong :(`);
      }
      return { login };
    }
  }).then((result) => {
    let i = 0;
    const speed = 50;
    const namaAwal = result.value.login.charAt(0);
    let txt;

    // Mendapatkan tanggal hari ini dalam format 'YYYY-MM-DD'
    const today = new Date().toISOString().slice(0, 10);

    if (result.value.login === "2024-07-24") {
      txt = `Semoga sayang ingat tanggal ini ya. Tiap bulan yang kita lalui bersama adalah perjalanan yang indah menuju kebahagiaan yang tak terbatas. Setiap momen bersamamu adalah pesta cinta yang tak pernah pudar. Dari hari pertama kita bertemu, aku tahu bahwa hidupku telah diberkati dengan keajaiban yang tak ternilai. Setiap harimu adalah sinar mentari yang menyinari jalan hidupku. Di setiap langkah yang kita ambil bersama, aku merasa diberkati memiliki seseorang sepertimu di sampingku.\n

Mari kita terus membangun kenangan indah, merencanakan masa depan yang cerah, dan menumbuhkan cinta yang tumbuh lebih dalam setiap hari. Bersamamu, aku merasa lengkap. Semoga hari-hari mendatang membawa kebahagiaan tanpa batas untuk kita berdua. Aku mencintaimu dengan segala yang aku miliki, dan aku bersyukur setiap hari bisa memanggilmu sebagai kekasihku.\n

Selamat monthsary, sayangku. Aku bersyukur bahwa kita bisa bersama dalam perjalanan ini. Aku tak pernah berharap untuk memiliki yang lebih dari dirimu.`;
    } else if (result.value.login) {
      txt = `Yahhh, kamu ga inget yaa? :(`;
    } else {
      txt = `Masukkan tanggal dong :(`;
    }

    const typeWriter = () => {
      if (i < txt.length) {
        messege2P.innerHTML += txt.charAt(i);
        i++;
        messege2.classList.remove('kelip');
        hilang2.style.display = "none";
        setTimeout(typeWriter, speed);
      } else {
        messege2.classList.add('kelip');
        body.classList.replace('background1', 'background2');
        body.classList.add('muncul');
        hilang2.style.display = "block";
        // Memulai pemutaran lagu kedua setelah pesan selesai ditampilkan
        audio.pause(); // Menghentikan lagu pertama jika masih berjalan
        audio2.play(); // Memulai lagu kedua
      }
    };
    typeWriter();
  });
});

hilang2.addEventListener('click', () => {
  window.open(`https://wa.me/${nomorWa}/?text=${textWa}`, '_blank');
});
