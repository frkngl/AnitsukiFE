document.addEventListener('DOMContentLoaded', function () {
    const carouselEl = document.querySelector('#carouselExampleCaptions');
    const progressBar = document.querySelector('.progress-circle .progress-bar');
    const timer = document.querySelector('.timer');
    const intervalTime = 10000; 
    let startTime = null; 
    let animationFrameId = null;
    let currentSlideIndex = 0;
    const slides = carouselEl.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    // Eleman kontrolü
    if (!carouselEl || !progressBar || !timer || totalSlides === 0) {
        console.error('Gerekli DOM elemanları bulunamadı!');
        return;
    }

    // Bootstrap Carousel başlatma
    let carousel;
    try {
        carousel = new bootstrap.Carousel(carouselEl, {
            interval: false, 
            pause: false,
            ride: false 
        });
    } catch (e) {
        console.error('Carousel başlatılamadı:', e);
        return;
    }

    // Slayt değiştirme fonksiyonu
    function goToSlide(index) {
        carousel.to(index);
        currentSlideIndex = index;
        startProgress();
    }

    // Progress bar ve timer animasyonu
    function startProgress() {
        const circumference = 2 * Math.PI * 15;
        progressBar.setAttribute('stroke-dasharray', circumference);
        progressBar.setAttribute('stroke-dashoffset', circumference);

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        startTime = performance.now(); 

        function updateProgress(currentTime) {
            const elapsed = currentTime - startTime; 
            const remainingTime = Math.max(intervalTime - elapsed, 0); 
            const progressFraction = Math.min(elapsed / intervalTime, 1); 

            const progressOffset = circumference * (1 - progressFraction);
            progressBar.setAttribute('stroke-dashoffset', progressOffset);

            const secondsLeft = Math.ceil(remainingTime / 1000);
            timer.textContent = secondsLeft;

            if (progressFraction >= 1) {
                const nextSlideIndex = (currentSlideIndex + 1) % totalSlides;
                goToSlide(nextSlideIndex);
            } else {
                animationFrameId = requestAnimationFrame(updateProgress);
            }
        }

        animationFrameId = requestAnimationFrame(updateProgress);
    }

    // Swipe (kaydırma) desteği ekleme
    let startX = null;
    let isDragging = false;
    const swipeThreshold = 50; // Minimum kaydırma mesafesi (px)

    // Mouse ve touch başlangıç olayları
    function handleStart(event) {
        const clientX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
        startX = clientX;
        isDragging = true;
    }

    // Mouse ve touch hareket olayları
    function handleMove(event) {
        if (!isDragging || startX === null) return;
        const clientX = event.type.includes('mouse') ? event.clientX : (event.touches ? event.touches[0].clientX : null);
        if (!clientX) return;

        const deltaX = clientX - startX;

        // Hareketi takip etmek için ek görsel geri bildirim (opsiyonel)
        // carouselEl.style.transform = `translateX(${deltaX}px)`;
    }

    // Mouse ve touch bitiş olayları
    function handleEnd(event) {
        if (!isDragging || startX === null) return;

        const clientX = event.type.includes('mouse') ? event.clientX : (event.changedTouches ? event.changedTouches[0].clientX : startX);
        const deltaX = clientX - startX;

        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0) {
                // Sağdan sola kaydırma (önceki slayt)
                const prevSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
                goToSlide(prevSlideIndex);
            } else {
                // Soldan sağa kaydırma (sonraki slayt)
                const nextSlideIndex = (currentSlideIndex + 1) % totalSlides;
                goToSlide(nextSlideIndex);
            }
        }

        // Sıfırlama
        isDragging = false;
        startX = null;
        // carouselEl.style.transform = ''; // Görsel geri bildirimi sıfırla (opsiyonel)
    }

    // Olay dinleyicilerini ekle
    carouselEl.addEventListener('mousedown', handleStart);
    carouselEl.addEventListener('mousemove', handleMove);
    carouselEl.addEventListener('mouseup', handleEnd);
    carouselEl.addEventListener('mouseleave', handleEnd); // Mouse carousel dışına çıkarsa

    carouselEl.addEventListener('touchstart', handleStart, { passive: true });
    carouselEl.addEventListener('touchmove', handleMove, { passive: true });
    carouselEl.addEventListener('touchend', handleEnd);

    // Slayt değişim olayı
    carouselEl.addEventListener('slid.bs.carousel', (e) => {
        currentSlideIndex = e.to; 
        startProgress(); 
    });

    // Sekme görünürlüğü takibi
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            const currentTime = performance.now();
            const elapsedSinceStart = currentTime - startTime;

            if (elapsedSinceStart >= intervalTime) {
                const cyclesMissed = Math.floor(elapsedSinceStart / intervalTime);
                const nextSlideIndex = (currentSlideIndex + cyclesMissed) % totalSlides;
                goToSlide(nextSlideIndex);
            } else if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updateProgress);
            }
        }
    });

    // İlk slayt için başlangıç
    goToSlide(0);

    // Sayfa kapandığında temizlik
    window.addEventListener('unload', () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });
});