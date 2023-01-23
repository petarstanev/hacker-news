import { useState, useEffect } from "react";

export default function useGetItem(itemId) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${itemId}.json?print=pretty`
        );

        if (!response.ok) {
          throw Error("Failed to fetch item - " + itemId);
        }

        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [itemId]);

  return [data, loading, error];
}
