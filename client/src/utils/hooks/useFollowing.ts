import { getFollowingURL } from "./../Urls";
import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "../Axios";
function useFollowing(id: string, config: AxiosRequestConfig) {
  const [following, setFollowing] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFollowing = async () => {
      setLoading(true);
      try {
        const response = await Axios.get(getFollowingURL(id), config);
        setFollowing(response.data);
      } catch (error) {}
      setLoading(false);
    };
    getFollowing();
  }, [config, id]);

  return { loading, following };
}
export default useFollowing;
