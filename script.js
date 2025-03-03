// Скрипт больше не нужен, так как у нас теперь одно видео

document.addEventListener('DOMContentLoaded', function() {
    // Получаем все видео элементы
    const videos = document.querySelectorAll('.main-video');
    
    // Если нет видео, выходим
    if (videos.length === 0) return;
    
    // Используем первое видео как основное
    const mainVideo = videos[0];
    
    // Функция для синхронизации всех видео
    function syncAllVideos() {
        const currentTime = mainVideo.currentTime;
        
        videos.forEach((video) => {
            // Проверяем, что это не основное видео и время отличается
            if (video !== mainVideo && Math.abs(video.currentTime - currentTime) > 0.1) {
                video.currentTime = currentTime;
            }
        });
    }
    
    // Синхронизируем при загрузке
    mainVideo.addEventListener('loadedmetadata', function() {
        videos.forEach((video) => {
            if (video !== mainVideo) {
                video.currentTime = mainVideo.currentTime;
            }
        });
    });
    
    // Синхронизируем при воспроизведении
    mainVideo.addEventListener('play', function() {
        videos.forEach((video) => {
            if (video !== mainVideo && video.paused) {
                video.play();
            }
        });
    });
    
    // Синхронизируем при паузе
    mainVideo.addEventListener('pause', function() {
        videos.forEach((video) => {
            if (video !== mainVideo && !video.paused) {
                video.pause();
            }
        });
    });
    
    // Синхронизируем время воспроизведения
    mainVideo.addEventListener('timeupdate', syncAllVideos);
    
    // Синхронизируем при перемотке
    mainVideo.addEventListener('seeking', function() {
        videos.forEach((video) => {
            if (video !== mainVideo) {
                video.currentTime = mainVideo.currentTime;
            }
        });
    });
    
    // Запускаем все видео, если они не запустились автоматически
    videos.forEach((video) => {
        video.play().catch(() => {
            // Добавляем обработчик клика для запуска видео при взаимодействии пользователя
            document.addEventListener('click', function startVideos() {
                videos.forEach(v => v.play());
                document.removeEventListener('click', startVideos);
            }, { once: true });
        });
    });
});
