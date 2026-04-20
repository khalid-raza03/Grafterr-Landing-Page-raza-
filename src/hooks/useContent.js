import { useEffect, useCallback, useState } from "react";
import { fetchAll } from "../services/api";

const useContent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchedData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchAll();
      setData(response);
    } catch (err) {
      setError(err?.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchedData();
  }, [fetchedData]);

  return { data, loading, error, retry: fetchedData };
};

export default useContent;
