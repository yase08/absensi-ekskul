import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import spinner from "../../../assets/spinner.gif";
import useRefreshToken from "../../../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <img src={spinner} alt="loading..." />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
