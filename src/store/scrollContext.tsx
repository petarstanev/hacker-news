import { useState } from "react";
import React from "react";

export const ScrollProvider = (props: { children: React.ReactNode }) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const setScrollPositionHandler = (position: number) => {
    setScrollPosition(position);
  };

  const scrollContext = {
    setScrollPosition: setScrollPositionHandler,
    scrollPosition: scrollPosition,
  };

  return (
    <ScrollContext.Provider value={scrollContext}>
      {props.children}
    </ScrollContext.Provider>
  );
};

interface ScrollContextProps {
  scrollPosition: number;
  setScrollPosition: (position: number) => void;
}

const ScrollContext = React.createContext<ScrollContextProps>({
  scrollPosition: 0,
  setScrollPosition: () => {},
});

export default ScrollContext;
