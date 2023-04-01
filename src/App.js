import React from "react";
import StoriesProvider from "./store/stories-provider";
import Stories from "./components/Stories";
import Header from "./components/Header";

function App() {
  return (
    <StoriesProvider>
      <Header />
      <Stories />
    </StoriesProvider>
  );
}

export default App;
