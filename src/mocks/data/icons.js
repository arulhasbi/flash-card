import { faker } from "@faker-js/faker";

const generateIcons = (topics) => {
  const result = [];
  for (const topic of topics) {
    result.push({
      id: faker.datatype.uuid(),
      name: topic,
    });
  }
  return result;
};

export const icons = generateIcons([
  "Book",
  "Ballon",
  "Bird",
  "Calendar",
  "Clover",
  "Crayons",
  "Data",
  "Fence",
  "Grill",
  "Hand",
  "Hat",
  "Internet",
  "Lady Bug",
  "Leaves",
  "Medicine",
  "Nest",
  "Shuttlecock",
  "Spade",
  "Statistics",
  "Sun",
  "Tree",
]);
