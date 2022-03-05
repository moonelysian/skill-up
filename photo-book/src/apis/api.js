const API_URL =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async (nodeId) => {
  const url = nodeId ? `${API_URL}/${nodeId}` : API_URL;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("서버 에러");
    }
    return await response.json();
  } catch (e) {
    alert(e.message);
  }
};
