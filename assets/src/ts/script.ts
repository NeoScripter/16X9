import VideoPopupHandler from "./modules/videos";
import Typewriter from "./modules/typewriter";

document.addEventListener('DOMContentLoaded', () => {
    new VideoPopupHandler().init();

    const portfolioBtn = document.querySelector('.portfolio__btn');

    portfolioBtn?.addEventListener('click', () => {
        document.querySelector('.portfolio__viewport')?.classList.toggle('portfolio__viewport--full');
    })

    const spanElement = document.querySelector<HTMLSpanElement>('.typing__bg-text');

    if (!spanElement) return
      const textContent = spanElement.textContent ?? '';
    
      const [firstString, secondString] = textContent.split(',').map(str => str.trim());


    const typewriter = new Typewriter(
        document.querySelector(".typing__front-text") as HTMLDivElement,
        {
          loop: true,
          typingSpeed: 100,
          deletingSpeed: 30,
        }
      )
      
      typewriter
        .typeString(`${firstString},`)
        .pauseFor(1000)
        .typeString(`\n${secondString}`)
        .pauseFor(2000)
        .deleteAll()
        .start();
});
