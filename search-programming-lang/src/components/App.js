import search from "../apis/api.js";
import SearchInput from "./SearchInput.js";
import SelectedLanguage from "./SelectedLanguage.js";
import Suggestion from "./Suggestion.js";

export default function App($app) {
  this.state = {
    selected: [],
    suggestions: [],
    inputValue: "",
    hoveredIndex: -1,
  };

  const handleInput = async (value) => {
    if (!value || value === "") {
      this.setState({
        ...this.state,
        suggestions: [],
        inputValue: "",
        hoveredIndex: -1,
      });
      return;
    }
    const results = await search(value);
    this.setState({
      ...this.state,
      inputValue: value,
      suggestions: results,
      hoveredIndex: -1,
    });
  };

  const handleClick = async ($clickedItem) => {
    let { selected } = this.state;
    $clickedItem.classList.add("Suggestion__item--selected");
    const suggestion = $clickedItem.textContent;
    const index = selected.indexOf(suggestion);

    if (index < 0) {
      selected = [...selected, suggestion];
    } else {
      selected = [
        ...selected.slice(0, index),
        ...selected.slice(index + 1),
        suggestion,
      ];
    }
    if (selected.length > 5) {
      selected = selected.slice(1);
    }
    return this.setState({ ...this.state, selected });
  };

  const $selected = new SelectedLanguage($app, this.state.selected);
  const $search = new SearchInput($app, this.state.inputValue, handleInput);
  const $suggestions = new Suggestion($app, this.state, handleClick);

  this.setState = (nextState) => {
    this.state = nextState;
    $selected.setState(this.state.selected);
    $search.setState(this.state.inputValue);
    $suggestions.setState(this.state);
  };

  const handleUpDown = (key) => {
    const UP = "ArrowUp";
    const DOWN = "ArrowDown";
    const SUBMIT = "Enter";
    if (key !== UP && key !== DOWN && key !== SUBMIT) {
      return;
    }
    const { suggestions, hoveredIndex } = this.state;
    if (key === UP) {
      if (hoveredIndex === 0) {
        this.setState({ ...this.state, hoveredIndex: suggestions.length - 1 });
      } else {
        this.setState({ ...this.state, hoveredIndex: hoveredIndex - 1 });
      }
    }
    if (key === DOWN) {
      if (hoveredIndex === suggestions.length - 1) {
        this.setState({ ...this.state, hoveredIndex: 0 });
      } else {
        this.setState({ ...this.state, hoveredIndex: hoveredIndex + 1 });
      }
    }
    $suggestions.focus(key === SUBMIT);
  };

  const init = () => {
    this.setState({
      ...this.state,
    });
    $app.addEventListener("keydown", (e) => handleUpDown(e.key));
  };
  init();
}
