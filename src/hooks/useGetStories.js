import { useState, useEffect } from "react";
import { getStories } from "../utils/api";

const useGetStories = (type) => {
  const [stories, setStories] = useState({});
  const [error, setError] = useState();
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
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [type, storiesType]);

  return [stories[type], isLoading, error];
};

export default useGetStories;
