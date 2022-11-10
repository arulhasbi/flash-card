import { rest } from "msw";
import { icons } from "./data/icons";
import { flashcardDB } from "./data/flashcard";

const mockDelay = (milliseconds) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

export const handlers = [
  rest.get("/icons", (req, res, ctx) => {
    const response = icons;
    return res(ctx.status(200), ctx.json(response));
  }),
  rest.post("/topics", async (req, res, ctx) => {
    mockDelay(1000);
    const body = await req.json();
    flashcardDB.topics.create({
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
    const response = flashcardDB.topics.getAll();
    return res(ctx.status(200), ctx.json(response));
  }),
  rest.post("/quizzes", async (req, res, ctx) => {
    mockDelay(1000);
    const body = await req.json();
    const topic = flashcardDB.topics.findFirst({
      where: {
        id: {
          equals: body.quiz.topic.id,
        },
      },
    });
    const quiz = flashcardDB.quizzes.create({
      title: body.quiz.title,
      topic: topic,
    });
    for (const card of body.cards) {
      flashcardDB.cards.create({
        front: card.front,
        back: card.back,
        quiz: quiz,
      });
    }
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        result: "success",
      })
    );
  }),
  rest.get("/quizzes", (req, res, ctx) => {
    const response = flashcardDB.quizzes.getAll();
    return res(ctx.status(200), ctx.json(response));
  }),
  rest.get("/cards", (req, res, ctx) => {
    const quizID = req.url.searchParams.get("id");
    let cards = flashcardDB.cards.getAll();
    cards = cards.filter((card) => {
      return card.quiz.id === quizID;
    });
    return res(ctx.status(200), ctx.json(cards));
  }),
];
