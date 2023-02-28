import { useState, useEffect } from "react";
import { getStories } from "../utils/api";

const useGetStories = (type) => {
  const [stories, setStories] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  let storiesType = stories[type];
  useEffect(() => {
    if (!storiesType) {
      setIsLoading(true);
      getStories(type)
        .then((stories) => {
          setStories((prevState) => ({
            ...prevState,
            [type]: stories,
          }));
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [type, storiesType]);

  return { isLoading, stories: stories[type] };
};

export default useGetStories;
