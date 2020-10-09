import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { useRootStore } from "../Store/RootStore";
import useFollowing from "../utils/hooks/useFollowing";
import styled from "styled-components";
import Default from "../Images/default_profile_400x400.png";
const UserWrapper = styled.div`
  padding: 0.4rem;
  color: white;
  display: flex;
`;
const UserTitle = styled.h4`
  padding: 0.2rem;
`;
const Avatar = styled.img`
  background-color: ${(props) => props.theme.colors.primary};
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;
`;

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
