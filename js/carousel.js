function initCarousel() {
  const nextButton = document.querySelectorAll("[data-carousel-button='next']");
  nextButton.forEach((button) => {
    const carouselParent = button.closest("[data-carousel]");
    const showDots = carouselParent.classList.contains("show-dots");

    const carouselTitle = document.createElement("div");
    carouselTitle.classList.add("flex", "justify-center");
    carouselTitle.innerHTML = `<div class="carousel-title" data-carousel-title>&nbsp;</div>`;
    carouselParent.prepend(carouselTitle);
    const slides = carouselParent.querySelectorAll("[data-slides] > li");
    setCarouselTitle(carouselParent, slides[0].dataset.title);

    if (showDots) {
      const divDots = document.createElement("div");
      divDots.classList.add("dots");
      slides.forEach((slide, i) => {
        const dotButton = document.createElement("button");
        dotButton.dataset.carouselIndex = i;
        if (i === 0) {
          dotButton.dataset.active = true;
        }
        dotButton.addEventListener("click", () => {
          const title = slide.dataset.title;
          slides.forEach((currSlide) => {
            delete currSlide.dataset.active;
          });
          divDots.childNodes.forEach((dot) => {
            delete dot.dataset.active;
          });
          slide.dataset.active = true;
          dotButton.dataset.active = true;
          setCarouselTitle(carouselParent, title);
        });
        dotButton.dataset.carouselDotButton = true;
        dotButton.innerHTML = "&nbsp;";
        dotButton.classList.add("dot");
        divDots.appendChild(dotButton);
      });
      carouselParent.appendChild(divDots);
      carouselParent.style.marginBottom = "16px";
    }
  });

  const buttons = document.querySelectorAll("[data-carousel-button]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : -1;
      const slides = button
        .closest("[data-carousel]")
        .querySelector("[data-slides]");
      const carouselParent = button.closest("[data-carousel]");
      const showDots = carouselParent.classList.contains("show-dots");

      const activeSlide = slides.querySelector("[data-active]");
      let newIndex = [...slides.children].indexOf(activeSlide) + offset;
      if (newIndex < 0) newIndex = slides.children.length - 1;
      if (newIndex >= slides.children.length) newIndex = 0;

      const { title } = slides.children[newIndex].dataset;

      setCarouselTitle(carouselParent, title);
      slides.children[newIndex].dataset.active = true;
      delete activeSlide.dataset.active;

      if (showDots) {
        const dots = carouselParent.querySelectorAll(".dots > button");
        dots.forEach((dot) => {
          const dotIndex = dot.dataset.carouselIndex;
          if (+dotIndex !== +newIndex) delete dot.dataset.active;
          else dot.dataset.active = true;
        });
      }
    });
  });
}

function setCarouselTitle(parent, title) {
  const carouselTitleContainer = parent.querySelector("[data-carousel-title]");
  if (title) {
    carouselTitleContainer.style.display = "block";
    carouselTitleContainer.innerHTML = title;
  } else {
    carouselTitleContainer.style.display = "none";
  }
}
