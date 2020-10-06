import React, { useState } from "react";
import Default from "../../Images/default_profile_400x400.png";
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
  const [isFollowed, setIsFollowed] = useState(false);
  return (
    <UserWrapper>
      <Avatar src={user.avatar ? user.avatar.url : Default} />
      <div>
        <UserLink to={`/users/${user.id}`}>{user.userName}</UserLink>
        <InfoEmail>@{user.email}</InfoEmail>
      </div>
      <FollowButton
        type="button"
        onClick={() => setIsFollowed(!isFollowed)}
        followed={isFollowed}
      >
        {isFollowed ? "Following" : "Followed"}
      </FollowButton>
    </UserWrapper>
  );
};

export default UserToFollow;
