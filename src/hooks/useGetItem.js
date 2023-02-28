import { useState, useEffect } from "react";
import { getItem } from "../utils/api";

export const useGetItem = (itemId) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!data[itemId]) {
      console.log("fetch " + itemId);
      setLoading(true);
      getItem(itemId)
        .then((item) => {
          setData((prevState) => ({
            ...prevState,
            [itemId]: item,
          }));
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      console.log("exist " + itemId);
    }

    //     setLoading(true);

    //     const response = await fetch(
    //       `https://hacker-news.firebaseio.com/v0/item/${itemId}.json?print=pretty`
    //     );

    //     if (!response.ok) {
    //       throw Error("Failed to fetch item - " + itemId);
    //     }

    //     const data = await response.json();
    //     setData(data);
    //   } catch (err) {
    //     setError(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // })();
  }, [itemId]);
  console.log(data);
  return [data[itemId], isLoading, error];
};
