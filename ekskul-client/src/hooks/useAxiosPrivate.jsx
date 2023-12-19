import { axiosPrivate } from "../utils/config";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "../context/AuthContext";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
         // Jika Anda ingin menangani blob untuk rute tertentu
         if (response.config.url.includes('export')) {
          // Handle response sebagai blob
          // Misalnya, ubah responseType menjadi 'blob'
          return { ...response, responseType: 'arraybuffer', method: 'GET', url: URL};
        }
        // Jika tidak, biarkan respons sesuai default
        return response;
      },
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
