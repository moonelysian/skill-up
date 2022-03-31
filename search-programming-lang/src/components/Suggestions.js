const _match = (input, target) => {
  const inputToLower = input.toLowerCase();
  const targetToLower = target.toLowerCase();
  const startIndex = targetToLower.indexOf(inputToLower);
  const endIndex = startIndex + input.length;
  if (startIndex < 0) {
    return target;
  }
  const highlighted = `${target.slice(
    0,
    startIndex
  )}<span class='Suggestion__item--matched'>${target.slice(
    startIndex,
    endIndex
  )}</span>${target.slice(endIndex)}`;
  return highlighted;
};

export default function Suggestion($app, initState, handleClick) {
  this.state = initState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const $target = document.createElement("div");
  $target.className = "Suggestion";

  this.render = () => {
    const { suggestions, hoveredIndex, inputValue } = this.state;
    if (suggestions.length === 0) {
      const isExist = $app.querySelector(".Suggestion");
      return isExist && $app.removeChild($target);
    }
    $app.appendChild($target);
    $target.innerHTML = `<ul>${suggestions
      .map((suggestion) => `<li>${_match(inputValue, suggestion)}</li>`)
      .join("")}</ul>`;

    const $elements = $target.querySelectorAll("li");
    $elements.forEach(($item, idx) => {
      $item.addEventListener("click", (e) => handleClick(e.currentTarget));
      if (idx === hoveredIndex) {
        $item.style.backgroundColor = "#90CDF4";
      }
    });
  };
}
