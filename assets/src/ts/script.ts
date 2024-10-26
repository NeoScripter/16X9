document.addEventListener('DOMContentLoaded', () => {
    // Select all preview videos
    const previewVideos = document.querySelectorAll<HTMLVideoElement>('.video-preview');
    const popup = document.getElementById('video-popup') as HTMLElement;
    const popupVideo = popup.querySelector<HTMLVideoElement>('.video-main');
    const closeButton = popup.querySelector<HTMLButtonElement>('.video-popup__close');
    const overlay = popup.querySelector<HTMLElement>('.video-popup__overlay');

    if (!popupVideo || !closeButton || !overlay) {
        console.error('Popup elements not found');
        return;
    }

    // Hover functionality for preview videos
    previewVideos.forEach((video: HTMLVideoElement) => {
        // Play video on hover
        video.addEventListener('mouseenter', () => {
            video.play().catch((err) => console.error('Error playing preview video:', err));
        });

        // Pause and reset video on mouse leave
        video.addEventListener('mouseleave', () => {
            video.pause();
            video.load();
        });

        // Click event to show the popup with the main video
        video.addEventListener('click', () => {
            const highQualitySrc = video.getAttribute('data-high-quality');

            if (highQualitySrc) {
                // Set the high-quality video source in the popup
                const sourceElement = popupVideo.querySelector('source') as HTMLSourceElement;
                sourceElement.src = highQualitySrc;

                popupVideo.load(); // Load the high-quality video
                popup.style.display = 'flex'; // Show the popup

                popupVideo.play().catch((err) => console.error('Error playing high-quality video:', err));
            } else {
                console.warn('High-quality video URL not found');
            }
        });
    });

    // Close popup and pause video
    const closePopup = () => {
        popup.style.display = 'none'; // Hide the popup
        popupVideo.pause(); // Pause the video
        popupVideo.currentTime = 0; // Reset the video

        const sourceElement = popupVideo.querySelector('source') as HTMLSourceElement;
        sourceElement.src = ''; // Clear the source to prevent loading
    };

    // Attach close button and overlay click events
    closeButton.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
});
