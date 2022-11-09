import { rest } from "msw";
import { icons } from "./data/icons";

const mockDelay = (milliseconds) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

export const handlers = [
  rest.get("/icons", (req, res, ctx) => {
    mockDelay(500);
    const response = icons;
    return res(ctx.status(200), ctx.json(response));
  }),
];
