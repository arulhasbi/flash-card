export const postTopic = async (body) => {
  const response = await fetch("/topics", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const json = await response.json();
  return json;
};
