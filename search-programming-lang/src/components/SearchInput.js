export default function SearchInput($app, value, onInput) {
  this.state = value;
  this.setState = (nextState) => {
    this.state = nextState;
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

  $input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
      return e.preventDefault();
    }
  });
  $input.addEventListener("input", (e) => {
    onInput(e.target.value);
  });
}
