import { useApiBase } from "./useApiBase";

const usePostApi = () => {
  const { data, loading, error, execute } = useApiBase("POST");
  return { data, loading, error, post: execute };
};

export default usePostApi;
