import { useState, useEffect } from "react";
import { getItem } from "../utils/api";

export const useGetItem = <T>(
  itemId: number
): [T | undefined, boolean, any] => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getItem<T>(itemId+'')//TODO: Remove conversion
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
