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
    const results = await search(value);
    this.setState({ ...this.state, inputValue: value, suggestions: results });
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
        ...selected.splice(0, index),
        ...selected.splice(index + 1),
        suggestion,
      ];
    }
    return this.setState({ ...this.state, selected });
  };

  const $selected = new SelectedLanguage($app, this.state.selected);
  const $search = new SearchInput($app, this.state.inputValue, handleInput);
  const $suggestions = new Suggestion(
    $app,
    this.state.suggestions,
    this.state.hoveredIndex,
    handleClick
  );

  this.setState = (nextState) => {
    this.state = nextState;
    $selected.setState(this.state.selected);
    $search.setState(this.state.inputValue);
    $suggestions.setState({
      hoveredIndex: this.state.hoveredIndex,
      suggestions: this.state.suggestions,
    });
  };

  const handleUpDown = (key) => {
    const UP = "ArrowUp";
    const DOWN = "ArrowDown";

    if (key !== UP && key !== DOWN) {
      return;
    }
    const { suggestions, hoveredIndex } = this.state;
    if (key === UP) {
      if (hoveredIndex === 0) {
        this.setState({ ...this.state, hoveredIndex: suggestions.length - 1 });
        $suggestions.focus();
      } else {
        this.setState({ ...this.state, hoveredIndex: hoveredIndex - 1 });
        $suggestions.focus();
      }
    }
    if (key === DOWN) {
      if (hoveredIndex === suggestions.length - 1) {
        this.setState({ ...this.state, hoveredIndex: 0 });
        $suggestions.focus();
      } else {
        this.setState({ ...this.state, hoveredIndex: hoveredIndex + 1 });
        $suggestions.focus();
      }
    }
    $suggestions.focus();
  };

  const init = () => {
    this.setState({
      ...this.state,
    });
    $app.addEventListener("keydown", (e) => handleUpDown(e.key));
  };
  init();
}
