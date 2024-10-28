export default class VideoPopupHandler {
    private popupOverlay: HTMLElement;
    private popupVideo: HTMLVideoElement;
    private closeButton: HTMLButtonElement;
    private galleryContainers: NodeListOf<HTMLElement>;

    constructor() {
        this.popupOverlay = document.getElementById('popup__overlay') as HTMLElement;
        this.popupVideo = this.popupOverlay.querySelector('.popup__video') as HTMLVideoElement;
        this.closeButton = this.popupOverlay.querySelector('.popup__close-btn') as HTMLButtonElement;
        this.galleryContainers = document.querySelectorAll<HTMLElement>('.popup-videos-parent');
    }

    public init() {
        this.attachEventsToContainers();
        this.attachPopupEvents();
    }

    // Attach event listeners to each .popup-videos-parent container
    private attachEventsToContainers(): void {
        this.galleryContainers.forEach(container => {
            container.addEventListener('mouseenter', (event) => this.handleMouseEnter(event), true);
            container.addEventListener('mouseleave', (event) => this.handleMouseLeave(event), true);
            container.addEventListener('click', (event) => this.handleClick(event), true);
        });
    }

    // Handle mouseenter event for videos
    private handleMouseEnter(event: Event): void {
        const target = event.target as HTMLVideoElement;

        if (target && target.tagName === 'VIDEO' && target.classList.contains('video-preview')) {
            this.playVideo(target);
        }
    }

    // Handle mouseleave event for videos
    private handleMouseLeave(event: Event): void {
        const target = event.target as HTMLVideoElement;

        if (target && target.tagName === 'VIDEO' && target.classList.contains('video-preview')) {
            this.resetVideo(target);
        }
    }

    // Handle click event for videos
    private handleClick(event: Event): void {
        const target = event.target as HTMLVideoElement;

        if (target && target.tagName === 'VIDEO' && target.classList.contains('video-preview')) {
            this.openPopup(target);
        }
    }

    // Play video on hover
    private playVideo(video: HTMLVideoElement): void {
        video.play().catch(err => console.error('Error playing preview video:', err));
    }

    // Pause, reset, and reload video to show the poster
    private resetVideo(video: HTMLVideoElement): void {
        video.pause();
        video.currentTime = 0;
        video.load();
    }

    // Open popup and load high-quality video
    private openPopup(video: HTMLVideoElement): void {
        const highQualitySrc = video.getAttribute('data-high-quality');

        if (highQualitySrc) {
            const sourceElement = this.popupVideo.querySelector('source') as HTMLSourceElement;
            sourceElement.src = highQualitySrc;
            this.popupVideo.load();
            this.popupOverlay.style.display = 'flex';
            this.popupVideo.play().catch(err => console.error('Error playing high-quality video:', err));
        } else {
            console.warn('High-quality video URL not found');
        }
    }

    // Attach event listeners for closing the popup
    private attachPopupEvents(): void {
        this.closeButton.addEventListener('click', () => this.closePopup());
        this.popupOverlay.addEventListener('click', (event) => {
            if (event.target === this.popupOverlay) this.closePopup();
        });
    }

    // Close the popup and reset the video
    private closePopup(): void {
        this.popupOverlay.style.display = 'none';
        this.popupVideo.pause();
        this.popupVideo.currentTime = 0;

        const sourceElement = this.popupVideo.querySelector('source') as HTMLSourceElement;
        sourceElement.src = ''; 
    }
}
