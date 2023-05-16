import { useState } from "react";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="font-bold text-xl p-2">Best of Hacker News</h1>
        <button
          onClick={() => {
            setModalOpen((open) => !open);
          }}
          className="border-black italic w-6 h-6 text-center border rounded-full"
        >
          i
        </button>
      </header>

      {modalOpen && (
        <div>
          <p>
            Best of Hacker News is an online website for displaying the top
            posts from the website{" "}
            <a href="https://news.ycombinator.com">
              Hacker News (news.ycombinator.com)
            </a>{" "}
            for each day.
          </p>
          <p>
            The idea of the website is inspired from{" "}
            <a href="https://hckrnews.com">hckr news (https://hckrnews.com)</a>{" "}
            and{" "}
            <a href="https://hackerweb.app">
              HackerWeb (https://hackerweb.app)
            </a>
          </p>
          <p>
            This website is build by Petar Stanev -
            <a href="https://petarstanev.com"> petarstanev.com </a> as a
            portfolio project and is still in beta. For any issues and feedback
            please let me know at bestofhackernews@petarstanev.com.
          </p>
          <p>Thank you.</p>
        </div>
      )}
    </>
  );
};

export default Header;
