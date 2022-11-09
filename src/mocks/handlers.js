import { rest } from "msw";
import { icons } from "./data/icons";
import { topicsDB } from "./data/topics";

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
  rest.post("/topics", async (req, res, ctx) => {
    mockDelay(2000);
    const body = await req.json();
    topicsDB.topics.create({
      name: body.name,
      iconID: body.iconID,
    });
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        result: "success",
      })
    );
  }),
  rest.get("/topics", (req, res, ctx) => {
    mockDelay(500);
    const response = topicsDB.topics.getAll();
    return res(ctx.status(200), ctx.json(response));
  }),
];
