import useAuth from "../hooks/useAuth";
  import axios from "../utils/config";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.data.accessToken,
        role: response.data.data.role,
      };
    });
    return response.data.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
