import React, { useCallback, useState, useMemo } from "react";
import Default from "../../Images/default_profile_400x400.png";
import { useRootStore } from "../../Store/RootStore";
import {
  Avatar,
  UserLink,
  UserWrapper,
  FollowButton,
  InfoEmail,
} from "../../Style/ComponentStyles/FollowUserStyles";
import Axios from "../../utils/Axios";
import { User } from "../../utils/hooks/useUsersToFollow";
import { followUserURL } from "../../utils/Urls";

interface Props {
  user: User;
}

const UserToFollow: React.FC<Props> = ({ user }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userStore } = useRootStore();

  const config = useMemo(() => {
    return userStore.setConfig();
  }, [userStore]);

  const handleClick = useCallback(
    async (id: string) => {
      setLoading(true);

      try {
        await Axios.post(followUserURL(id), null, config);
        setIsFollowed(!isFollowed);
      } catch (error) {}
      setLoading(false);
    },
    [isFollowed]
  );

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
        followed={isFollowed}
        disabled={loading}
      >
        {loading ? "Loading" : isFollowed ? "Following" : "Follow"}
      </FollowButton>
    </UserWrapper>
  );
};

export default UserToFollow;
