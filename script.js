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
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('nav').offsetHeight, // Sesuaikan dengan tinggi nav
                    behavior: 'smooth'
                });

                // Opsional: Tandai link navigasi yang aktif
                document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // 2. Memberikan label 'active' pada link navigasi berdasarkan scroll position (lebih kompleks)
    // Ide dasar: saat user scroll, periksa section mana yang sedang terlihat di viewport
    // dan tambahkan kelas 'active' pada link navigasi yang sesuai.
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('nav').offsetHeight;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
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

    // Anda bisa menambahkan fungsionalitas JavaScript lainnya di sini nanti,
    // seperti validasi form, efek animasi saat scroll, dll.
});