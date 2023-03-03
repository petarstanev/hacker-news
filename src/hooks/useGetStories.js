import { useState, useEffect } from "react";
import { getStories } from "../utils/api";

const useGetStories = (category) => {
  const [stories, setStories] = useState({});
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  if (category === "best") {
    category = 'newstories';
  } 

  let storiesCategory = stories[category];
  useEffect(() => {
    if (!storiesCategory) {
      setIsLoading(true);
      getStories(category)
        .then((stories) => {
          setStories((prevState) => ({
            ...prevState,
            [category]: stories,
          }));
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [category, storiesCategory]);
  console.log(stories);

  const previous = new Date();
  previous.setDate(new Date().getDate() - 1);

  // let today = stories[category].filter(s => s.time > previous);
  // console.log(today);

  return [stories[category], isLoading, error];
};

export default useGetStories;
