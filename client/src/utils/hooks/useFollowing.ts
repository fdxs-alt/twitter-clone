import { getFollowingURL } from "./../Urls";
import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "../Axios";

export interface User {
  avatar?: {
    id: string;
    key: string;
    url: string;
    created: string;
    updated: string;
  };
  background?: {
    id: string;
    key: string;
    url: string;
    created: string;
    updated: string;
  };
  city?: string;
  code?: string;
  confirmed: boolean;
  country?: string | null;
  created?: string;
  description: string | null;
  email: string;
  fullName: string;
  id: string;
  name: string;
  phone: string;
  profileLink?: string;
  surname: string;
  userName: string;
}
function useFollowing(id: string, config: AxiosRequestConfig) {
  const [following, setFollowing] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFollowing = async () => {
      setLoading(true);
      try {
        const response = await Axios.get(getFollowingURL(id), config);
        setFollowing(response.data);
        console.log(response.data);
      } catch (error) {}
      setLoading(false);
    };
    getFollowing();
  }, [config, id]);

  return { loading, following };
}
export default useFollowing;
