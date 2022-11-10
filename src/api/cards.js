export const getCards = async (id) => {
  const response = await fetch(`/cards?id=${id}`);
  const json = await response.json();
  return json;
};
