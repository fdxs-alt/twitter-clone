import { useObserver } from "mobx-react-lite";
import React, { useState } from "react";
import Default from "../../Images/default_profile_400x400.png";
import { useRootStore } from "../../Store/RootStore";
import {
  Avatar,
  UserLink,
  UserWrapper,
  FollowButton,
  InfoEmail,
} from "../../Style/ComponentStyles/FollowUserStyles";
import { User } from "../../utils/hooks/useUsersToFollow";

interface Props {
  user: User;
}

const UserToFollow: React.FC<Props> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const { userStore } = useRootStore();

  return useObserver(() => {
    const handleClick = async (id: string) => {
      setLoading(true);
      await userStore.setFollowing(id);
      setLoading(false);
    };

    return (
      <UserWrapper>
        <Avatar src={user.avatar ? user.avatar.url : Default} />
        <div>
          <UserLink to={`/users/${user.id}`}>{user.userName}</UserLink>
          <InfoEmail>@{user.email}</InfoEmail>
        </div>
        <FollowButton
          type="button"
          onClick={() => handleClick(user.id)}
          followed={userStore.userData?.following.includes(user.id)}
          disabled={loading}
        >
          {loading
            ? "Loading"
            : userStore.userData?.following.includes(user.id)
            ? "Following"
            : "Follow"}
        </FollowButton>
      </UserWrapper>
    );
  });
};

export default UserToFollow;
