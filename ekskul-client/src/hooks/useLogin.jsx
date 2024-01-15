import { useEffect, useState } from "react";

export const useLogin = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (jwtCookie) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  return authenticated;
};
