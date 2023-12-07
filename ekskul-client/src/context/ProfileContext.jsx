import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../services/auth.service";

const ProfileContext = createContext();

export function useProfile() {
  return useContext(ProfileContext);
}

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState  ({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (error) {
        setError(error);
      } finally {
      }
    };

    fetchData();
  }, []);

  const value = {
    profile,
    setProfile,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
