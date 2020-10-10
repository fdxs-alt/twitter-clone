import { useObserver } from "mobx-react-lite";
import React, { useCallback, useState } from "react";
import Default from "../Images/default_profile_400x400.png";
import { UserStore } from "../Store/UserStore";
import {
  Avatar,
  InfoWrapper,
  UserTitle,
  UserWrapper,
  Email,
} from "../Style/ComponentStyles/FollowingAndFollowersStyles";
import { FollowButton } from "../Style/ComponentStyles/FollowUserStyles";

interface Props {
  user: any;
  userStore: UserStore;
}
const Follower: React.FC<Props> = ({ user, userStore }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(
    async (id: string) => {
      setLoading(true);
      await userStore.setFollowing(id);
      setLoading(false);
    },
    [userStore]
  );
  return useObserver(() => {
    return (
      <UserWrapper key={user.id}>
        <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <Avatar src={user.avatar ? user.avatar.url : Default} />
          <InfoWrapper>
            <div>
              <UserTitle to={`/user/${user.id}`}>{user.userName}</UserTitle>
              <Email>@{user.email}</Email>
            </div>
            <FollowButton
              followed={userStore.userData?.following.includes(user.id)}
              onClick={() => handleClick(user.id)}
              disabled={loading}
            >
              {userStore.userData?.following.includes(user.id)
                ? "Unfollow"
                : "Follow"}
            </FollowButton>
          </InfoWrapper>
        </div>
      </UserWrapper>
    );
  });
};

export default Follower;
