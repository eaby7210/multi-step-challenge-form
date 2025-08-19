import { useCallback, useState } from "react";
import api from "../interceptors/axios";

export const useApiBase = (method) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (url, payload = null, options = {}) => {
   
    setLoading(true);
     setData(null);
    setError(null);
    try {
      const res = await api({
        method,
        url,
        data: payload,
        ...options,
      });
      setData(res.data);
      setError(null);
      return res.data;
    } catch (err) {
        console.log("apierr "+JSON.stringify(err.response.data))
      setError(err);
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [method]);

  return { data, loading, error, execute };
};
