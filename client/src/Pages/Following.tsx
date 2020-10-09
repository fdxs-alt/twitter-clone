import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { useRootStore } from "../Store/RootStore";
import useFollowing from "../utils/hooks/useFollowing";

import Default from "../Images/default_profile_400x400.png";
import { Avatar, InfoWrapper, UserTitle, UserWrapper } from "../Style/ComponentStyles/FollowingAndFollowersStyles";


const Following = () => {
  const { userStore } = useRootStore();
  const params = useParams<{ id: string }>();
  const config = useMemo(() => userStore.setConfig(), [userStore]);
  const { loading, following } = useFollowing(params.id, config);

  if (loading) return <Loader />;

  return (
    <>
      {following.map((user: any) => (
        <UserWrapper key={user.id}>
          <Avatar src={user.avatar ? user.avatar.url : Default} />
          <InfoWrapper>
            <div>
              <UserTitle>{user.userName}</UserTitle>
            </div>
          </InfoWrapper>
        </UserWrapper>
      ))}
    </>
  );
};

export default Following;
