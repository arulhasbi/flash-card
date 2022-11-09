import { faker } from "@faker-js/faker";
import { factory, primaryKey } from "@mswjs/data";

export const topicsDB = factory({
  topics: {
    id: primaryKey(faker.datatype.uuid),
    name: String,
    iconID: String,
  },
});
