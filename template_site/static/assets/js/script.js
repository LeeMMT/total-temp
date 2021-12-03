const transparentHeaderModule = (function () {
  const header = document.querySelector("header");
  const solidColor = "var(--header-color)";

  const checkScrollPos = () => {
    if (!document.querySelector("body.homepage")) return;
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos > window.innerHeight - 80) {
      header.classList.add("solid");
      document.querySelector(".nav-container .logo").classList.add("smaller");
    } else {
      header.classList.remove("solid");
      document.querySelector(".nav-container .logo").classList.remove("smaller");
    }
  };

  window.addEventListener("scroll", checkScrollPos);
})();

const mobileMenu = (function () {
  const mobileMenuBtn = document.querySelector("#menu-container");
  const mobileMenu = document.querySelector(".mobile-menu");
  let state = closed;

  const showMenu = function () {
    document.body.classList.toggle("stop-scrolling");
    mobileMenu.classList.toggle("show-menu");
  };

  const menuAnimation = bodymovin.loadAnimation({
    container: document.querySelector("#menu-container"), // required
    path: "../static/assets/animations/menu-white.json", // required
    renderer: "svg", // required
    loop: false, // optional
    autoplay: false, // optional
  });

  menuAnimation.goToAndStop(0, true);
  menuAnimation.setSpeed(2);

  const animateMenu = function () {
    if (state === "closed") {
      menuAnimation.playSegments([45, 72], true);
      state = "open";
      showMenu();
    } else {
      menuAnimation.playSegments([0, 30], true);
      state = "closed";
      showMenu();
    }
  };

  const anchorTags = document.querySelectorAll(".mobile-menu a");

  const closeMobileMenu = () => {
    animateMenu();
  };

  anchorTags.forEach((item) => {
    item.addEventListener("click", closeMobileMenu);
  });
  mobileMenuBtn.addEventListener("click", animateMenu);
})();
