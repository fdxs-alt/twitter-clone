import { getSpecificUserURL } from "./../Urls";
import { useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { UserData } from "../../Store/UserStore";
import { Tweet } from "../../Store/TweetStore";
import Axios from "../Axios";

interface User extends UserData {
  tweets: Tweet[];
}
function useSpecificUser(config: AxiosRequestConfig, id: string) {
  const [loading, setLoading] = useState(false);
  const [specificUser, setSpecificUser] = useState<User | null>();

  useEffect(() => {
    const getSpecificUser = async () => {
      setLoading(true);

      try {
        const response = await Axios.get(getSpecificUserURL(id), config);

        setSpecificUser(response.data);
      } catch (error) {}
      setLoading(false);
    };

    getSpecificUser();
  }, [config, id]);

  return { specificUser, loading };
}

export default useSpecificUser;
