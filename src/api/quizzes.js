export const getQuizzes = async () => {
  const response = await fetch("/quizzes");
  const json = await response.json();
  return json;
};

export const postQuiz = async (body) => {
  const response = await fetch("/quizzes", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const json = await response.json();
  return json;
};
