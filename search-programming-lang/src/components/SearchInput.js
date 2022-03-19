export default function SearchInput($app, value, onInput) {
  this.state = value;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const $form = document.createElement("form");
  $form.className = "SearchInput";

  const $input = document.createElement("input");
  $input.className = "SearchInput__input";
  $input.type = "text";
  $input.placeholder = "프로그램 언어를 입력하세요.";
  $input.value = value;
  $form.appendChild($input);
  $app.appendChild($form);

  $input.addEventListener("input", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      return e.preventDefault();
    }
    onInput(e.target.value);
  });

  this.render = () => {};
}
