import { useEffect, useState } from "react";

const useUserFind = () => {
  const [userPhone, setUserPhone] = useState("");
  const [userId, setUserId] = useState(0);
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);
  const pathname = location.pathname;
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const [lastElement] = pathSegments.slice(-1);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://panchahut-server.vercel.app/api/v1/user/userDetails/${userPhone}`
        );
        const data = await response.json();
        setUserDetail({ ...data?.data, pathName: lastElement });
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setLoading(false);
    };

    if (userPhone) {
      fetchUser();
    }
  }, [userPhone, userId, reload]);

  return {
    userDetail,
    setUserPhone,
    setUserDetail,
    setUserId,
  };
};

export default useUserFind;
