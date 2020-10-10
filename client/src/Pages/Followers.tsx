import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Follower from "../Components/Follower";
import Loader from "../Components/Loader";
import { useRootStore } from "../Store/RootStore";
import { Title } from "../Style/ComponentStyles/SharedStyles";
import useFollowers from "../utils/hooks/useFollowers";

const Followers = () => {
  const { userStore } = useRootStore();
  const { id } = useParams<{ id: string }>();

  const config = useMemo(() => userStore.setConfig(), [userStore]);
  const { loading, followers } = useFollowers(id, config);
  console.log(followers);
  if (loading) return <Loader />;

  return (
    <>
      <Title>Followers</Title>
      {followers.map((user) => (
        <Follower user={user} userStore={userStore} />
      ))}
    </>
  );
};

export default Followers;
