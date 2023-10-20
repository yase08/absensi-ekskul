const getTokenFromSessionStorage = sessionStorage.getItem("token")
  ? sessionStorage.getItem("token")
  : null;

export const config = {
  headers: {
    Authorization:
      getTokenFromSessionStorage !== null
        ? `Bearer ${getTokenFromSessionStorage}`
        : "",
    Accept: "application/json",
  },
};
