import Axios from "../Axios";
import { useState, useEffect } from "react";
import { UserStore } from "../../Store/UserStore";
import { getUserToFollowURL } from "../Urls";

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
  country?: string;
  created: string;
  description?: string;
  email: string;
  fullName: string;
  id: string;
  name: string;
  profileLink?: string;
  surname: string;
  userName: string;
}
function useUsersToFollow(userStore: UserStore) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [usersToFollow, setUsersToFollow] = useState<User[]>([]);

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
