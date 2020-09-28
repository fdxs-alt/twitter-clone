import { useObserver } from "mobx-react-lite";
import React from "react";
import { useRootStore } from "../Store/RootStore";
import { Title, Wrapper } from "../Style/ComponentStyles/SharedStyles";

const ProfilePage = () => {
  const { userStore } = useRootStore();

  return useObserver(() => {
    return (
      <Wrapper>
        <Title>{userStore.userData?.userName}</Title>
      </Wrapper>
    );
  });
};

export default ProfilePage;
