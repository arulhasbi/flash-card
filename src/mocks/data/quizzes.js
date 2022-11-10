import { faker } from "@faker-js/faker";
import { factory, oneOf, primaryKey } from "@mswjs/data";

export const quizzesDB = factory({
  quizzes: {
    id: primaryKey(faker.datatype.uuid),
    title: String,
    topic: oneOf("topics"),
  },
});
