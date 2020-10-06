import { useObserver } from "mobx-react-lite";
import React from "react";
import { useRootStore } from "../../Store/RootStore";
import useUsersToFollow, { User } from "../../utils/hooks/useUsersToFollow";
import { WhoToFollowTitle } from "../../Style/ComponentStyles/FollowUserStyles";
import { Button } from "../../Style/ComponentStyles/TagStyles";
import UserToFollow from "./UserToFollow";

const FollowUsers = () => {
  const { userStore } = useRootStore();
  const { loading, usersToFollow, setPage } = useUsersToFollow(userStore);

  return useObserver(() => {
    if (loading) return <div>Loading...</div>;
    else
      return (
        <div>
          <WhoToFollowTitle>Who to follow</WhoToFollowTitle>
          {usersToFollow.map((user: User) => (
            <UserToFollow user={user} key={user.id} />
          ))}
          {usersToFollow.length % 5 === 0 && usersToFollow.length !== 0 && (
            <Button type="button" onClick={() => setPage((prev) => prev + 5)}>
              Show more
            </Button>
          )}
        </div>
      );
  });
};

export default FollowUsers;
