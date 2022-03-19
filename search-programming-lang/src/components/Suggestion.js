export default function Suggestion(
  $app,
  suggestions,
  hoveredIndex,
  handleClick
) {
  this.state = {
    hoveredIndex,
    suggestions,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const $target = document.createElement("div");
  $target.className = "Suggestion";
  $app.appendChild($target);

  this.render = () => {
    $target.innerHTML = `<ul>${this.state.suggestions
      .map((suggestion) => `<li>${suggestion}</li>`)
      .join("")}</ul>`;

    const $elements = $target.querySelectorAll("li");
    $elements.forEach(($item) => {
      $item.addEventListener("click", (e) => handleClick(e.currentTarget));
    });
  };

  this.focus = () => {
    console.log(this.state.hoveredIndex);
    const $elements = $target.querySelectorAll("li");
    $elements.forEach(($item, idx) => {
      if (idx === this.state.hoveredIndex) {
        $item.style.backgroundColor = "#90CDF4";
      } else {
        $item.style.backgroundColor = "#ffff";
      }
    });
  };
}
