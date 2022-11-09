export const getIcons = async () => {
  const response = await fetch("/icons");
  const json = await response.json();
  return json;
};
