import { useState, useEffect } from "react";
import { getStories } from "../utils/api";
import { SelectedStory } from "../store/stories-context";

const useGetStories = (category: string) => {
  const [stories, setStories] = useState<SelectedStory[]>([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  if (category === "best") {
    category = "newstories";
  }

  useEffect(() => {
      setIsLoading(true);
      getStories(category)
        .then((stories) => {
          setStories(stories);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
  }, [category]);
  console.log(stories);

  // const previous = new Date();
  // previous.setDate(new Date().getDate() - 1);

  return [stories, isLoading, error];
};

export default useGetStories;
