import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./features/store";
import App from "./app/App";
import { Topic } from "./components/topic";
import { NewQuiz } from "./components/newquiz";
import { Quizzes } from "./features/quizzes/quizzes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    children: [
      {
        path: "topics",
        element: <Topic />,
      },
      {
        path: "new-quiz",
        element: <NewQuiz />,
      },
      {
        path: "quizzes",
        element: <Quizzes />,
      },
    ],
  },
]);
