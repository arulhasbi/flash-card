import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Footer } from "../components/footer";

function App() {
  return (
    <AppWrapper>
      <AppMaxWidth className="max-w-[700px] mr-auto ml-auto">
        <nav className="mt-10 border w-max ml-auto mr-auto px-6 py-3 rounded-3xl shadow-md">
          <ul className="flex gap-20 justify-center">
            <li className="font-extrabold hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-500">
              <NavLink to="topics">Topics</NavLink>
            </li>
            <li className="font-extrabold hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-500">
              <NavLink to="quizzes">Quizzes</NavLink>
            </li>
            <li className="font-extrabold hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-500">
              <NavLink to="new-quiz">New Quiz</NavLink>
            </li>
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
        <Footer />
      </AppMaxWidth>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div``;
const AppMaxWidth = styled.div``;
