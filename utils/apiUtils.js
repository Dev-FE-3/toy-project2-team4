export const fetchData = async (url, data = null, method = "GET") => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("네트워크 응답이 좋지 않습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch 오류:", error);
    throw error;
  }
};
