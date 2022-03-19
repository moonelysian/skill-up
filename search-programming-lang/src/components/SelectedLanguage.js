export default function SelectedLanguage($app, seleted) {
  this.state = seleted;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const $target = document.createElement("div");
  $target.className = "SelectedLanguage";
  $app.appendChild($target);

  this.render = () => {
    $target.innerHTML = `<ul>${this.state
      .map((language) => `<li data-language=${language}>${language}</li>`)
      .join("")}</ul>`;
  };
}
