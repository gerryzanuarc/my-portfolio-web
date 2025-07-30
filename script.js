// script.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Smooth Scrolling untuk Navigasi
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah perilaku default link

            const targetId = this.getAttribute('href'); // Dapatkan ID target (misal: "#about")
            const targetSection = document.querySelector(targetId); // Dapatkan elemen section

            if (targetSection) {
                // Scroll ke bagian target dengan efek halus
                // Dapatkan tinggi navigasi secara dinamis
                const navHeight = document.querySelector('nav').offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - navHeight, // Sesuaikan dengan tinggi nav
                    behavior: 'smooth'
                });

                // Opsional: Tandai link navigasi yang aktif
                document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // 2. Memberikan label 'active' pada link navigasi berdasarkan scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    const navBar = document.querySelector('nav'); // Ambil elemen nav

    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = navBar.offsetHeight; // Dapatkan tinggi nav saat scroll
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            // Sesuaikan offsetTop dengan tinggi nav karena nav sekarang sticky
            const sectionTop = section.offsetTop - navHeight - 1; // Kurangi 1px untuk toleransi kecil
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });

    // --- FITUR BARU: Efek Ketik Otomatis (Typewriter Effect) ---
    const roles = ["Pengembang Web", "AI Enthusiast", "Pelajar Machine Learning", "Kreator Solusi"]; // Sesuaikan ini!
    let roleIndex = 0;
    let charIndex = 0;
    const typingSpeed = 100; // Kecepatan ketik (ms per karakter)
    const deletingSpeed = 50; // Kecepatan hapus (ms per karakter)
    const delayBetweenRoles = 1500; // Jeda antar peran setelah selesai ketik/hapus (ms)
    const headlineElement = document.querySelector('header p'); // Elemen p di dalam header

    if (headlineElement) { // Pastikan elemen ditemukan sebelum memanipulasinya
        function type() {
            if (roleIndex < roles.length) {
                if (charIndex < roles[roleIndex].length) {
                    headlineElement.textContent += roles[roleIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(type, typingSpeed);
                } else {
                    setTimeout(erase, delayBetweenRoles);
                }
            }
        }

        function erase() {
            if (charIndex > 0) {
                headlineElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, deletingSpeed);
            } else {
                roleIndex = (roleIndex + 1) % roles.length; // Pindah ke peran berikutnya (loop)
                setTimeout(type, typingSpeed);
            }
        }

        // Mulai efek ketik saat halaman dimuat
        headlineElement.textContent = ''; // Kosongkan teks awal
        type();
    }


    // --- FITUR BARU: Tampilkan/Sembunyikan Detail Proyek ---
    document.querySelectorAll('.toggle-details').forEach(button => {
        button.addEventListener('click', function() {
            // Mendapatkan elemen parent (project-item) dari tombol yang diklik
            const projectItem = this.closest('.project-item');
            if (!projectItem) return; // Pastikan elemen ditemukan

            const details = projectItem.querySelector('.project-details');
            if (!details) return; // Pastikan elemen detail ditemukan

            // Toggle display style
            if (details.style.display === 'none' || details.style.display === '') {
                details.style.display = 'block';
                this.textContent = 'Sembunyikan Detail';
            } else {
                details.style.display = 'none';
                this.textContent = 'Baca Lebih Lanjut';
            }
        });
    });

    // Tambahan: Inisialisasi semua detail proyek agar tersembunyi saat dimuat
    document.querySelectorAll('.project-details').forEach(details => {
        details.style.display = 'none';
    });

}); // Akhir dari DOMContentLoaded