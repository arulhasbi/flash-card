import { faker } from "@faker-js/faker";
import { factory, primaryKey, oneOf } from "@mswjs/data";

export const flashcardDB = factory({
  cards: {
    id: primaryKey(faker.datatype.uuid),
    front: String,
    back: String,
    quiz: oneOf("quizzes"),
  },
  quizzes: {
    id: primaryKey(faker.datatype.uuid),
    title: String,
    topic: oneOf("topics"),
  },
  topics: {
    id: primaryKey(faker.datatype.uuid),
    name: String,
    iconID: String,
  },
});
