 document.addEventListener('DOMContentLoaded', () => {
            const player = new Plyr('#player', {
                controls: ['play-large', 'rewind', 'play', 'fast-forward', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'fullscreen'],
                settings: ['captions', 'quality', 'speed', 'loop'],
                captions: { active: true, language: 'auto', update: true },
                autoplay: true,
                fullscreen: {
                    enabled: true,
                    fallback: true,
                    iosNative: false,
                    container: '#video-container'
                },
                i18n: {
                    restart: 'Başa sar',
                    rewind: 'Geri sar',
                    play: 'Oynat',
                    pause: 'Duraklat',
                    fastForward: 'İleri sar',
                    seek: 'Ara',
                    seekLabel: '{currentTime} konumuna git',
                    played: 'Oynatıldı',
                    buffered: 'Önbelleğe alındı',
                    currentTime: 'Geçerli süre',
                    duration: 'Toplam süre',
                    volume: 'Ses düzeyi',
                    mute: 'Sesi kapat',
                    unmute: 'Sesi aç',
                    enableCaptions: 'Altyazıyı etkinleştir',
                    disableCaptions: 'Altyazıyı devre dışı bırak',
                    download: 'İndir',
                    enterFullscreen: 'Tam ekrana geç',
                    exitFullscreen: 'Tam ekrandan çık',
                    frameTitle: 'Video için çerçeve',
                    captions: 'Altyazılar',
                    settings: 'Ayarlar',
                    speed: 'Hız',
                    normal: 'Normal',
                    quality: 'Kalite',
                    loop: 'Tekrarla',
                    start: 'Başla',
                    end: 'Bitir',
                    all: 'Tümü',
                    reset: 'Sıfırla',
                    disabled: 'Devre dışı',
                    enabled: 'Etkin',
                    advertisement: 'Reklam',
                    qualityBadge: {
                        2160: '4K',
                        1440: 'HD',
                        1080: 'HD',
                        720: 'HD',
                        576: 'SD',
                        480: 'SD'
                    }
                }
            });

            const playerHeader = document.querySelector('.player-header');
            let controlsTimeout;

            function isMobileDevice() {
                return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
            }

            function showHeader({ immediate = false } = {}) {
                playerHeader.classList.remove('hidden');
                clearTimeout(controlsTimeout);

                const delay = immediate ? 100 : isMobileDevice() ? 3000 : 2000;

                controlsTimeout = setTimeout(() => {
                    if (player.playing) {
                        playerHeader.classList.add('hidden');
                    }
                }, delay);
            }

            function updateCaptionFontSize() {
                const captions = document.querySelector('.plyr__captions');
                if (captions) {
                    captions.style.fontSize = isMobileDevice() ? '1rem' : '2rem';
                }
            }

            player.on('ready', () => {
                showHeader();
                updateCaptionFontSize();
            });

            // Mouse veya dokunma hareketi olduğunda header'ı göster
            ['mousemove', 'touchstart'].forEach(evt => {
                document.addEventListener(evt, () => showHeader());
            });

            // Video oynatıldığında hızlıca gösterip kısa sürede gizle
            player.on('play', () => {
                showHeader({ immediate: true });
            });

            // Durdurulduğunda header'ı göster ve gizlenmesin
            player.on('pause', () => {
                playerHeader.classList.remove('hidden');
                clearTimeout(controlsTimeout);
            });

            // Plyr kontrollerine tıklanınca da header'ı göster
            document.querySelector('.plyr').addEventListener('click', () => {
                showHeader();
            });

            // Alt yazı boyutunu pencere boyutuna göre güncelle
            window.addEventListener('resize', updateCaptionFontSize);

            // Player’a tıklayarak oynat/durdur
            document.querySelector('#player').addEventListener('click', () => {
                player.playing ? player.pause() : player.play();
            });

            // Klavye kontrolleri
            document.addEventListener('keydown', (event) => {
                if (!player) return;

                switch (event.key.toLowerCase()) {
                    case ' ':
                        event.preventDefault();
                        player.playing ? player.pause() : player.play();
                        break;
                    case 'm':
                        player.muted = !player.muted;
                        break;
                    case 'f':
                        player.fullscreen.toggle();
                        break;
                    case 'arrowleft':
                        player.currentTime = Math.max(player.currentTime - 10, 0);
                        break;
                    case 'arrowright':
                        player.currentTime = Math.min(player.currentTime + 10, player.duration);
                        break;
                    case 'arrowup':
                        player.volume = Math.min(player.volume + 0.05, 1);
                        break;
                    case 'arrowdown':
                        player.volume = Math.max(player.volume - 0.05, 0);
                        break;
                    case 'c':
                        player.toggleCaptions();
                        break;
                }
            });

            // Geri tuşu
            document.getElementById('back-button').addEventListener('click', () => {
                window.history.back();
            });

            const episodesPanel = document.getElementById('episodes-panel');
            const toggleButton = document.querySelector('.episodes-toggle-btn');
            const closeButton = document.querySelector('.episodes-panel .close');

            toggleButton.addEventListener('click', () => {
                const isOpen = episodesPanel.classList.contains('open');
                episodesPanel.classList.toggle('open', !isOpen);
                toggleButton.setAttribute('aria-expanded', String(!isOpen));
                episodesPanel.setAttribute('aria-hidden', String(isOpen));
            });

            closeButton.addEventListener('click', () => {
                episodesPanel.classList.remove('open');
                toggleButton.setAttribute('aria-expanded', 'false');
                episodesPanel.setAttribute('aria-hidden', 'true');
            });

            // Panel dışına tıklanınca kapat
            document.addEventListener('click', function (event) {
                const isClickInside = episodesPanel.contains(event.target) || toggleButton.contains(event.target);
                if (!isClickInside && episodesPanel.classList.contains('open')) {
                    episodesPanel.classList.remove('open');
                    toggleButton.setAttribute('aria-expanded', 'false');
                    episodesPanel.setAttribute('aria-hidden', 'true');
                }
            });
        });