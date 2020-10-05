import { useObserver } from "mobx-react-lite";
import React from "react";
import { useRootStore } from "../../Store/RootStore";
import useUsersToFollow from "../../utils/hooks/useUsersToFollow";
import Default from "../../Images/default_profile_400x400.png";
import {
  Avatar,
  UserLink,
  UserWrapper,
  WhoToFollowTitle,
  FollowButton,
  InfoEmail,
} from "../../Style/ComponentStyles/FollowUserStyles";
import { Button } from "../../Style/ComponentStyles/TagStyles";

const FollowUsers = () => {
  const { userStore } = useRootStore();
  const { loading, usersToFollow, setPage } = useUsersToFollow(userStore);

  return useObserver(() => {
    if (loading) return <div>Loading...</div>;
    else
      return (
        <div>
          <WhoToFollowTitle>Who to follow</WhoToFollowTitle>
          {usersToFollow.map((user: any) => (
            <UserWrapper key={user.id}>
              <Avatar src={user.avatar ? user.avatar.url : Default} />
              <div>
                <UserLink to={`/users/${user.id}`}>{user.userName}</UserLink>
                <InfoEmail>@{user.email}</InfoEmail>
              </div>
              <FollowButton type="button">Follow</FollowButton>
            </UserWrapper>
          ))}
          {usersToFollow.length % 5 === 0 && (
            <Button type="button" onClick={() => setPage((prev) => prev + 5)}>
              Show more
            </Button>
          )}
        </div>
      );
  });
};

export default FollowUsers;
