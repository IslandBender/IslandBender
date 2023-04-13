const topButton = document.querySelector("#top-button");
const modal = document.querySelector("#modal");
const modalImg = document.querySelector("#modal-img");
const parallax = document.querySelector('#parallax-container');
const parallaxContainer = document.querySelectorAll("#parallax-container img");
const miniImagesDiv = Array.from(document.querySelectorAll("#mini-images > *"));
const miniImages = miniImagesDiv.map((child) =>
  getComputedStyle(child).backgroundImage.replace('url("', "").replace('")', "")
);

for (let i = 0; i < miniImagesDiv.length; i++) {
  const url = miniImages[i];
  miniImagesDiv[i].onclick = function () {
    openModal(url);
  };
}

const openModal = (image) => {
  modal.style.display = "block";
  if (image) changeModalImage(image);
};

const closeModal = () => {
  modal.style.display = "none";
};



const changeModalImage = (url) => {
  const source = modalImg.children[0];
  const img = modalImg.children[1];

  if (url.includes(".gif")) {
    source.type = "video/webm";
    source.srcset = url.replace(".gif", ".webm");
  } else {
    source.type = "image/jpeg";
    source.srcset = url;
  }

  img.src = url;
};

const nextImage = () => {
  const atualImage = modalImg.children[1].src;
  const atualIndex = miniImages.indexOf(atualImage);
  let next = (atualIndex + 1) % miniImages.length;
  changeModalImage(miniImages[next]);
};

const prevImage = () => {
  const atualImage = modalImg.children[1].src;
  const atualIndex = miniImages.indexOf(atualImage);
  let next = (atualIndex - 1 + miniImages.length) % miniImages.length;
  changeModalImage(miniImages[next]);
};

const render = () => {
  const y = window.scrollY;
  parallax.style = `--length: ${parallaxContainer.length}; --scroll: ${-y}px;`;
  topButton.style.opacity = 1 - Math.max(0, y / 200);
};

window.addEventListener("scroll", render, false);

  const videoPlayer = document.getElementById("video-player");

  videoPlayer.addEventListener("click", function() {
    if (!document.fullscreenElement) {
      videoPlayer.requestFullscreen()
        .catch(err => {
          alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
      document.exitFullscreen()
        .catch(err => {
          alert(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
        });
    }
  });
