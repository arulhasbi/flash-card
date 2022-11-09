export const postTopic = async (body) => {
  const response = await fetch("/topics", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const json = await response.json();
  return json;
};

export const getTopics = async () => {
  const response = await fetch("/topics");
  const json = await response.json();
  return json;
};
