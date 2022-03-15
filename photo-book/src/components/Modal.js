const IMAGE_PREFIX =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

const getImageSource = (isLoading, selectedImage) => {
  if (selectedImage) {
    selectedImage = selectedImage.split("/").join("/");
  }
  return isLoading
    ? "./assets/nyan-cat.gif"
    : selectedImage
    ? `${IMAGE_PREFIX}${selectedImage}`
    : "";
};

export default function Modal({ $app, initState, handleClose }) {
  this.state = initState;
  this.$target = document.createElement("div");
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { isLoading, selectedImage } = this.state;
    this.$target.className = `Modal ${isLoading ? "Loading" : "ImageViewer"}`;
    if (selectedImage) {
      this.$target.addEventListener("click", (e) => handleClose(e));
      document.addEventListener("keydown", (e) => handleClose(e));
    }
    this.$target.style.display = isLoading || selectedImage ? "block" : "none";
    this.$target.innerHTML = `<div class="content"><img src=${getImageSource(
      isLoading,
      selectedImage
    )} /></div>`;
  };
}
