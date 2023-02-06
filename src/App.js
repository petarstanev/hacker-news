import React from "react";
import StoriesProvider from "./store/stories-provider";
import Stories from "./components/Stories";

function App() {
  return (
    <StoriesProvider>
      <Stories />
    </StoriesProvider>
  );
}

export default App;
