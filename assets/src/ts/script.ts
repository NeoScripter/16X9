import VideoPopupHandler from "./modules/videos";
import Typewriter from "./modules/typewriter";

document.addEventListener('DOMContentLoaded', () => {
    new VideoPopupHandler().init();

    const portfolioBtn = document.querySelector('.portfolio__btn');

    portfolioBtn?.addEventListener('click', () => {
        document.querySelector('.portfolio__viewport')?.classList.toggle('portfolio__viewport--full');
    })

    const typewriter = new Typewriter(
        document.querySelector(".typing__text") as HTMLDivElement,
        {
          loop: true,
          typingSpeed: 100,
          deletingSpeed: 0,
        }
      )
      
      typewriter
        .typeString("Творим истории,")
        .pauseFor(1000)
        .typeString("\nсоздаем шедевры")
        .pauseFor(2000)
        .deleteAll()
        .start()
});
