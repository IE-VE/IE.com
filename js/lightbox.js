function initLightbox(classSelector = "lightbox") {
  // Append modal
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.id = "lightbox-modal";
  modal.innerHTML = `
    <span class="close" id="close-lightbox-modal"> &times; </span>
    <div class="modal-content">
    <img
        src=""
        alt=""
        id="lightbox-modal-image"
        style="object-fit: contain; width: 100%"
    />
`;
  document.querySelector("main").appendChild(modal);
  document
    .getElementById("close-lightbox-modal")
    .addEventListener("click", function () {
      const modalEl = document.getElementById("lightbox-modal");
      modalEl.classList.remove("open");
    });

  const lightBoxElem = document.getElementsByClassName(classSelector);
  for (let i = 0; i < lightBoxElem.length; i++) {
    lightBoxElem[i].addEventListener("click", function () {
      const src = this.getAttribute("src");
      const modalEl = document.getElementById("lightbox-modal");
      const modalImgEl = document.getElementById("lightbox-modal-image");
      modalImgEl.src = src;
      modalEl.classList.add("open");
    });
  }
}

function initLightboxVideo(classSelector = "lightbox") {
  // Append modal
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.id = "video-lightbox-modal";
  modal.innerHTML = `
    <span class="close" id="close-video-lightbox-modal"> &times; </span>
    <div class="modal-content">
      <div class="video-container">
        <video controls id="modal-video" class="video"></video>
      </div>
    </div>
`;
  document.querySelector("main").appendChild(modal);
  document
    .getElementById("close-video-lightbox-modal")
    .addEventListener("click", function () {
      const modalEl = document.getElementById("video-lightbox-modal");
      modalEl.classList.remove("open");
    });

  const lightBoxElem = document.getElementsByClassName(classSelector);
  for (let i = 0; i < lightBoxElem.length; i++) {
    lightBoxElem[i].addEventListener("click", function () {
      const src = this.getAttribute("data-video");
      const source = document.createElement("source");
      const videoEl = document.getElementById("modal-video");
      source.setAttribute("src", src);
      source.setAttribute("type", "video/mp4");
      videoEl.appendChild(source);
      // videoEl.play();

      const modalEl = document.getElementById("video-lightbox-modal");
      modalEl.classList.add("open");
    });
  }
}
