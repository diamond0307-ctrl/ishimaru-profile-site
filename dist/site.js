const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const dialog = document.querySelector(".lightbox");
const dialogImage = dialog?.querySelector("img");
const dialogClose = dialog?.querySelector(".lightbox-close");

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!dialog || !dialogImage) return;
    const image = button.querySelector("img");
    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt;
    dialog.showModal();
  });
});

dialogClose?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
