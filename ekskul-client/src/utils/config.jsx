const getTokenFromSessionStorage = sessionStorage.getItem("token") || null;

export const config = {
  headers: {
    Authorization: getTokenFromSessionStorage
      ? `Bearer ${getTokenFromSessionStorage}`
      : "",
    Accept: "application/json",
  },
};
