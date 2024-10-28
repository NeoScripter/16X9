import VideoPopupHandler from "./modules/videos";

document.addEventListener('DOMContentLoaded', () => {
    new VideoPopupHandler().init();

    const portfolioBtn = document.querySelector('.portfolio__btn');

    portfolioBtn?.addEventListener('click', () => {
        document.querySelector('.portfolio__viewport')?.classList.toggle('portfolio__viewport--full');
    })
});
