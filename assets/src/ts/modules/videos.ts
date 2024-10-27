export default class VideoPopupHandler {
    private previewVideos: NodeListOf<HTMLVideoElement>;
    private popupOverlay: HTMLElement;
    private popupVideo: HTMLVideoElement;
    private closeButton: HTMLButtonElement;
    private observer: IntersectionObserver | null = null;

    constructor() {
        this.previewVideos = document.querySelectorAll<HTMLVideoElement>('.video-preview');
        this.popupOverlay = document.getElementById('popup__overlay') as HTMLElement;
        this.popupVideo = this.popupOverlay.querySelector('.popup__video') as HTMLVideoElement;
        this.closeButton = this.popupOverlay.querySelector('.popup__close-btn') as HTMLButtonElement;
    }

    public init() {
        this.initializeObserver();
        this.attachEventListeners();
    }

    // Initialize the Intersection Observer
    private initializeObserver(): void {
        this.observer = new IntersectionObserver(this.handleIntersection.bind(this));

        this.previewVideos.forEach((video) => {
            const lowQualitySrc = video.querySelector('source')?.getAttribute('src');
            video.setAttribute('data-src', lowQualitySrc || '');

            video.querySelector('source')?.removeAttribute('src');

            this.observer?.observe(video);
        });
    }

    // Handle Intersection Observer entries
    private handleIntersection(entries: IntersectionObserverEntry[]): void {
        entries.forEach((entry) => {
            const video = entry.target as HTMLVideoElement;

            if (entry.isIntersecting) {
                this.loadVideo(video);
                this.observeHover(video);
                this.observer?.unobserve(video); 
            }
        });
    }

    // Load the video when it becomes visible
    private loadVideo(video: HTMLVideoElement): void {
        const source = video.querySelector('source') as HTMLSourceElement;
        const dataSrc = video.getAttribute('data-src');

        if (source && dataSrc) {
            source.src = dataSrc;
            video.load();
        }
    }

    // Attach hover and click event listeners
    private observeHover(video: HTMLVideoElement): void {
        video.addEventListener('mouseenter', () => this.playVideo(video));
        video.addEventListener('mouseleave', () => this.resetVideo(video));
        video.addEventListener('click', () => this.openPopup(video));
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

    // Attach popup and overlay event listeners
    private attachEventListeners(): void {
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