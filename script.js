// togle class
const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// perintah klik sembarang untuk menghilangkan nav
const menu = document.querySelector("#menu");

document.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !navbarNav.contains(e.target))
    navbarNav.classList.remove("active");
});

const sliderItems = document.querySelectorAll(".slider-item");
let sliderActive = 1;

//  menu icon
// const menuIcon = document.getElementById("menu-icon");
// const menuList = document.getElementById("menu-list");
// menuIcon.addEventListener("click", () => {
//   menuList.classList.toggle("hidden");
// });

// slider
if (sliderItems) {
  sliderItems.forEach((slider, index) => {
    if (index === 0) {
      slider.setAttribute("data-show", "show");
    } else {
      slider.setAttribute("data-show", "hidden");
    }
  });

  setInterval(() => {
    sliderItems.forEach((slider, index) => {
      if (sliderActive === index) {
        slider.setAttribute("data-show", "show");
      } else {
        slider.setAttribute("data-show", "hidden");
      }
    });

    if (sliderActive === sliderItems.length - 1) {
      sliderActive = 0;
    } else {
      sliderActive++;
    }
  }, 5000);
}

// Initialize Swiper

// const swiper = new Swiper(".slider-wrapper", {
//   loop: true,
//   grabCursor: true,
//   spaceBetween: 10,

//   // If we need pagination
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//     dynamicBullets: true,
//   },

//   // Navigation arrows
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },

//   breakpoints: {
//     0: {
//       slidesPerview: 1,
//     },
//     758: {
//       slidesPerview: 2,
//     },
//     1366: {
//       slidesPerview: 3,
//     },
//   },
// });
const swiper = new Swiper(".slider-wrapper", {
  loop: true,
  grabCursor: true,
  spaceBetween: 20, // Menambah jarak antar panel
  slidesPerView: 1, // Default untuk tampilan mobile

  // Jika kita perlu pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1, // Tampilan mobile, satu panel
    },
    768: {
      slidesPerView: 2, // Tampilan tablet, dua panel
    },
    1366: {
      slidesPerView: 3, // Tampilan desktop, tiga panel
    },
    // Tambahkan breakpoint lain jika diperlukan
  },
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Mencegah halaman melakukan refresh saat submit

  // Ambil nilai dari input
  var name = document.getElementById("name").value;
  var whatsapp = document.getElementById("whatsapp").value;
  var pickup = document.getElementById("pickup").value;
  var destination = document.getElementById("destination").value;
  var orderType = document.getElementById("orderType").value;

  // Periksa jika ada input yang kosong
  if (!name || !whatsapp || !pickup || !destination || !orderType) {
    alert("Semua kolom harus diisi!"); // Menampilkan peringatan jika ada input kosong
    return; // Menghentikan proses jika ada yang kosong
  }

  // Pastikan nomor WhatsApp valid dan tidak mengandung simbol atau angka 0 diawal
  if (whatsapp.startsWith("0")) {
    whatsapp = whatsapp.substring(1); // Menghapus angka 0 di depan
  }

  // Membuat pesan yang akan dikirim
  var message = `Halo, saya ${name}, saya ingin memesan layanan Pemuda Express.\n\nNo WhatsApp: ${whatsapp}\nTitik Penjemputan: ${pickup}\nTujuan: ${destination}\nJenis Order: ${orderType}`;

  // Gantilah nomor WhatsApp tujuan berikut dengan nomor tujuan yang sesuai
  var targetWhatsApp = "6281290874146";

  // Membuat URL WhatsApp untuk mengirim pesan
  var whatsappURL = `https://wa.me/${targetWhatsApp}?text=${encodeURIComponent(
    message
  )}`;

  // Mengarahkan pengguna ke WhatsApp di tab baru (blank)
  window.open(whatsappURL, "_blank");

  function getLocation(inputId) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const mapLink = `https://maps.google.com/?q=${lat},${lng}`;
          document.getElementById(inputId).value = mapLink;
        },
        function (error) {
          alert("Gagal mengambil lokasi. Pastikan izin lokasi diaktifkan.");
        }
      );
    } else {
      alert("Browser tidak mendukung geolocation.");
    }
  }
});

// LAYANAN PERUSAHAAN
// JavaScript sederhana untuk geser carousel
let index = 0;
const track = document.getElementById("carouselTrack");
const slides = document.querySelectorAll(".carousel-slide");
const dotsContainer = document.getElementById("carouselDots");
const slidesPerView = window.innerWidth < 768 ? 1 : 2;
const maxIndex = Math.ceil(slides.length / slidesPerView) - 1;

function renderDots() {
  dotsContainer.innerHTML = "";
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement("button");
    if (i === index) dot.classList.add("active");
    dot.addEventListener("click", () => moveTo(i));
    dotsContainer.appendChild(dot);
  }
}

function updateSlide() {
  const slideWidth = slides[0].offsetWidth;
  track.style.transform = `translateX(-${
    index * slideWidth * slidesPerView
  }px)`;
  renderDots();
}

function moveSlide(dir) {
  index += dir;
  if (index < 0) index = 0;
  if (index > maxIndex) index = maxIndex;
  updateSlide();
}

function moveTo(i) {
  index = i;
  updateSlide();
}

// Inisialisasi
window.addEventListener("resize", () => location.reload());
renderDots();
updateSlide();

// menu
function scrollJajan(direction) {
  const track = document.getElementById("jajanTrack");
  const scrollAmount = 150;
  track.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

// DATA KUNJUNGAN
fetch(
  "https://script.google.com/macros/s/AKfycbz8MC5zm04MXXY55iOCjX3hb9icHCyUeJSnmDBahRUgx3iCT7ExMvRJxhbZcNQppzDZ/exec",
  {
    method: "POST",
    body: JSON.stringify({
      userAgent: navigator.userAgent,
      page: window.location.href,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }
);
