import search from "../api.js";
import { orderSuggestions } from "../utils.js";
import SearchInput from "./SearchInput.js";
import SelectedLanguage from "./SelectedLanguage.js";
import Suggestions from "./Suggestions.js";

export default function App($app) {
  this.state = {
    selected: [],
    suggestions: [],
    inputValue: "",
    hoveredIndex: 0,
    hoveredSuggestion: "",
  };

  const handleInput = async (value) => {
    if (!value || value === "") {
      this.setState({
        ...this.state,
        suggestions: [],
        inputValue: "",
        hoveredIndex: 0,
      });
      return;
    }
    const result = await search(value);
    this.setState({
      ...this.state,
      inputValue: value,
      suggestions: result,
      hoveredIndex: 0,
    });
    return;
  };

  const alertAndUpdateSelected = (suggestion) => {
    alert(suggestion);
    const selected = orderSuggestions(this.state.selected, suggestion);
    this.setState({ ...this.state, selected });
  };

  const handleClick = async ($clicked) => {
    $clicked.classList.add("Suggestion__item--selected");
    const suggestion = $clicked.textContent;
    alertAndUpdateSelected(suggestion);
  };

  const handleEnter = (key) => {
    const SUBMIT = "Enter";
    if (key !== SUBMIT) {
      return;
    }
    const { hoveredIndex, suggestions } = this.state;
    const suggestion = suggestions[hoveredIndex];
    alertAndUpdateSelected(suggestion);
  };
  const handleUpDown = (key) => {
    const UP = "ArrowUp";
    const DOWN = "ArrowDown";

    if (key !== UP && key !== DOWN) {
      return;
    }

    const { hoveredIndex, suggestions } = this.state;

    if (key === DOWN) {
      if (hoveredIndex === suggestions.length - 1) {
        this.setState({ ...this.state, hoveredIndex: 0 });
        return;
      }
      this.setState({ ...this.state, hoveredIndex: hoveredIndex + 1 });
      return;
    }

    if (key === UP) {
      if (hoveredIndex === 0) {
        this.setState({ ...this.state, hoveredIndex: suggestions.length - 1 });
        return;
      }
      this.setState({ ...this.state, hoveredIndex: hoveredIndex - 1 });
      return;
    }
  };

  const $selected = new SelectedLanguage($app, this.state.selected);
  const $input = new SearchInput($app, this.state.inputValue, handleInput);
  const $suggestion = new Suggestions($app, this.state, handleClick);

  this.setState = (nextState) => {
    this.state = nextState;
    $selected.setState(this.state.selected);
    $input.setState(this.state.inputValue);
    $suggestion.setState(this.state);
  };

  const init = () => {
    this.setState({ ...this.state });
    $app.addEventListener("keydown", (e) => handleUpDown(e.key));
    $app.addEventListener("keydown", (e) => handleEnter(e.key));
  };
  init();
}
