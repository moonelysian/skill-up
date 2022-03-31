const API_URL =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

const search = async (keyword) => {
  if (keyword) {
    const res = await fetch(`${API_URL}/languages?keyword=${keyword}`);
    const result = await res.json();
    return result;
  }
  return [];
};

export default search;
