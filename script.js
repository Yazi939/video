// Скрипт больше не нужен, так как у нас теперь одно видео

document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.main-video');
    let mainVideo = videos[0];

    // Синхронизируем все видео с первым
    videos.forEach((video, index) => {
        if (index > 0) {
            video.currentTime = mainVideo.currentTime;
        }
    });

    // Обработчик для синхронизации времени воспроизведения
    mainVideo.addEventListener('timeupdate', function() {
        videos.forEach((video, index) => {
            if (index > 0 && Math.abs(video.currentTime - mainVideo.currentTime) > 0.1) {
                video.currentTime = mainVideo.currentTime;
            }
        });
    });
});
