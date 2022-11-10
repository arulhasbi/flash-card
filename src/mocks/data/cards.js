import { faker } from "@faker-js/faker";
import { factory, oneOf, primaryKey } from "@mswjs/data";

export const cardsDB = factory({
  cards: {
    id: primaryKey(faker.datatype.uuid),
    front: String,
    back: String,
    quiz: oneOf("quizzes"),
  },
});
