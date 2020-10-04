import React from "react";
import { useRootStore } from "../Store/RootStore";
import useUsersToFollow from "../utils/hooks/useUsersToFollow";

const FollowUsers = () => {
  const { userStore } = useRootStore();
  const { loading, setPage } = useUsersToFollow(userStore);

  if (loading) return null;

  return <div onClick={() => setPage((prev) => prev + 5)}>Follow</div>;
};

export default FollowUsers;
