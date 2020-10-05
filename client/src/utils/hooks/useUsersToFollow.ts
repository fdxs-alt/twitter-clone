import Axios from "../Axios";
import { useState, useEffect } from "react";
import { UserStore } from "../../Store/UserStore";
import { getUserToFollowURL } from "../Urls";

function useUsersToFollow(userStore: UserStore) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [usersToFollow, setUsersToFollow] = useState<any>(null);

  useEffect(() => {
    const getUsersToFollow = async () => {
      setLoading(true);

      if (!userStore.accessToken) return;

      try {
        const response = await Axios.get(
          getUserToFollowURL(page),
          userStore.setConfig()
        );
        setUsersToFollow(response.data);
      } catch (error) {}

      setLoading(false);
    };

    getUsersToFollow();
  }, [page, userStore]);

  return { loading, page, setPage, usersToFollow };
}
export default useUsersToFollow;
