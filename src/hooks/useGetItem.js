import { useState, useEffect } from "react";
import { getItem } from "../utils/api";

export const useGetItem = (itemId) => {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getItem(itemId)
      .then((item) => {
        setData(item);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  return [data, isLoading, error];
};
