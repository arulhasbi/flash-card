import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./features/store";
import App from "./app/App";
import { Topic } from "./components/topic";

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
    ],
  },
]);
