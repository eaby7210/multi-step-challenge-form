import { useEffect, useRef } from "react";
import { useApiBase } from "./useApiBase";

const useGetApi = (url, options = {}, autoFetch = true, initialFetch = true) => {
  const { data, loading, error, execute } = useApiBase("GET");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (autoFetch) {
      execute(url, null, options);
    } else if (initialFetch && !hasFetched.current) {
      execute(url, null, options);
      hasFetched.current = true;
    }
  }, [url, options, autoFetch, initialFetch, execute]);

  return { data, loading, error, refetch: () => execute(url, null, options) };
};

export default useGetApi;
