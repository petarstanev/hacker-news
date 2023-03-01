import { useState, useEffect } from "react";
import { getStories } from "../utils/api";

const useGetStories = (category) => {
  const [stories, setStories] = useState({});
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  return [stories[category], isLoading, error];
};

export default useGetStories;
