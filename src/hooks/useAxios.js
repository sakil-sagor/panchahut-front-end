import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthState } from "../contexts/AuthProvider";

// const instance = axios.create({
//     baseURL: 'https://ass8-b8.vercel.app/api/v1',
//     withCredentials: true,
// })

export const axiosSecure = axios.create({
  baseURL: "https://panchahut-server.vercel.app/api/v1",
  withCredentials: true,
});

const useAxios = () => {
  // return instance;
  const { logOut } = useContext(AuthState);

  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log("error tracked in the interceptor", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          console
            .log("logout the user")
            // logOut()
            //     .then(() => {
            //         navigate('/registration')
            //     })
            .catch((error) => console.log(error));
        }
      }
    );
  }, []);

  return axiosSecure;
};
export default useAxios;
