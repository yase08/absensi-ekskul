import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useLogin = () => {
  const [authenticated, setAuthenticated] = useState(false);

  // const readCookie = (name) => {
  //   const cookieString = document.cookie;
  //   console.log(cookieString);
  //   const cookies = cookieString.split("; ");
  //   console.log(cookies);

  //   for (const cookie of cookies) {
  //     const [key, value] = cookie.split("=");
  //     if (key === name) {
  //       return value;
  //     }
  //   }

  //   return null;
  // };

  useEffect(() => {
    if (jwtCookie) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  return authenticated;
};
