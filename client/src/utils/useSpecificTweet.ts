import Axios from "./Axios";
import { useState, useEffect } from "react";
import { UserStore } from "./../Store/UserStore";
import { getSpecifcTweetURL } from "./Urls";
function useSpecificTweet(userStore: UserStore, id: string) {
  const [loading, setLoading] = useState(true);
  const [specificTweet, setSpecificTweet] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    const getSpecifcTweet = async () => {
      try {
        const response = await Axios.get(
          getSpecifcTweetURL(id),
          userStore.setConfig()
        );

        setSpecificTweet(response.data);
        setLoading(false);
      } catch (error) {}
    };

    getSpecifcTweet();

    return () => {
      setSpecificTweet(null);
    };
  }, [userStore, id]);

  return { loading, specificTweet };
}

export default useSpecificTweet;
