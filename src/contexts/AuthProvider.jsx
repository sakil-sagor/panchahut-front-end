import { createContext, useContext, useEffect, useState } from "react";
import { axiosSecure } from "../hooks/useAxios";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      let userInfo = JSON.parse(localStorage.getItem("data"));

      if (userInfo?.phone) {
        try {
          const response = await axiosSecure.get(
            `http://localhost:5000/api/v1/user/${userInfo?.phone}`,
            {
              withCredentials: true,
            }
          );
          console.log(response?.data);
          setUser(response?.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [loading]);

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("data");
    // document.cookie.split(";").forEach((cookie) => {
    //   document.cookie = cookie
    //     .replace(/^ +/, "")
    //     .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    // });

    setUser(null);
  };
  const authInfo = {
    user,
    setUser,
    logout,
    loading,
    setLoading,
    reload,
    setReload,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
export const AuthState = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
