export const orderSuggestions = (suggestions, clickedItem) => {
  const idx = suggestions.indexOf(clickedItem);
  let result = [];

  if (idx < 0) {
    result = [...suggestions, clickedItem];
  } else {
    result = [
      ...suggestions.slice(0, idx),
      ...suggestions.slice(idx + 1),
      clickedItem,
    ];
  }

  if (result.length > 5) {
    result = result.slice(1);
  }
  return result;
};
