const imageSliderModule = (function () {
  const carouselSlide = document.querySelector(".carousel-slide");
  const carouselImages = document.querySelectorAll(".carousel-slide img");
  //Buttons
  const previousBtn = document.querySelector("#previousBtn");
  const nextBtn = document.querySelector("#nextBtn");
  //Counter
  let counter = 1;
  let size = carouselImages[0].clientWidth;
  //current slide indicator
  let previousCount = 0;
  const slideCounters = document.querySelectorAll(".slide-counter");

  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";

  nextBtn.addEventListener("click", () => {
    if (counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = "transform 0.2s ease-in-out";
    counter++;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
    updateSlideCounter("right");
  });

  previousBtn.addEventListener("click", () => {
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.2s ease-in-out";
    counter--;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
    updateSlideCounter("left");
  });

  carouselSlide.addEventListener("transitionend", () => {
    if (carouselImages[counter].id === "lastClone") {
      carouselSlide.style.transition = "none";
      counter = carouselImages.length - 2;
      carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
    }
    if (carouselImages[counter].id === "firstClone") {
      carouselSlide.style.transition = "none";
      counter = carouselImages.length - counter;
      carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
    }
  });

  const setSize = () => {
    size = carouselImages[0].clientWidth;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  };

  //Slide Counter Stuff

  const updateSlideCounter = function (direction) {
    slideCounters[previousCount].classList.toggle("current");
    if (previousCount === 0 && direction === "left") {
      slideCounters[carouselImages.length - 3].classList.toggle("current");
      previousCount = carouselImages.length - 3;
    } else if (previousCount === carouselImages.length - 3 && direction === "right") {
      slideCounters[0].classList.toggle("current");
      previousCount = 0;
    } else if (direction === "left") {
      slideCounters[previousCount - 1].classList.toggle("current");
      previousCount--;
    } else {
      slideCounters[previousCount + 1].classList.toggle("current");
      previousCount++;
    }
  };

  window.addEventListener("resize", setSize);
  window.onload = setSize;
})();
