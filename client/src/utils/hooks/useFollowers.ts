import { getFollowersURL } from "./../Urls";
import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "../Axios";
import { User } from "./useFollowing";
function useFollowers(id: string, config: AxiosRequestConfig) {
  const [followers, setFollowers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFollowers = async () => {
      setLoading(true);
      try {
        const { data } = await Axios.get(getFollowersURL(id), config);
        setFollowers(data);
      } catch (error) {}
      setLoading(false);
    };
    getFollowers();
  }, [config, id]);

  return { loading, followers };
}
export default useFollowers;
