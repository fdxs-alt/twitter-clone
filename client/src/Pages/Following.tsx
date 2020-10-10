import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Follower from "../Components/Follower";
import Loader from "../Components/Loader";
import { useRootStore } from "../Store/RootStore";
import { Title } from "../Style/ComponentStyles/SharedStyles";
import useFollowing from "../utils/hooks/useFollowing";

const Following = () => {
  const { userStore } = useRootStore();
  const params = useParams<{ id: string }>();
  const config = useMemo(() => userStore.setConfig(), [userStore]);
  const { loading, following } = useFollowing(params.id, config);

  if (loading) return <Loader />;

  return (
    <>
      <Title>Following</Title>
      {following.map((user) => (
        <Follower user={user} userStore={userStore} />
      ))}
    </>
  );
};

export default Following;
