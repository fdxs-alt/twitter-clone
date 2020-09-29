import { useObserver } from "mobx-react-lite";
import React from "react";
import { useRootStore } from "../Store/RootStore";
import { Title, Wrapper } from "../Style/ComponentStyles/SharedStyles";
import Default from "../Images/default_profile_400x400.png";
import styled from "styled-components";
import { Button } from "../Style/ComponentStyles/RegisterPageStyles";
import { UserName, Email } from "../Style/ComponentStyles/SpecifcTweetStyles";
import dayjs from "dayjs";
import { BsFillCalendarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const BackgroundPhoto = styled.img`
  width: 100%;
  min-height: 100%;
  object-fit: cover;
`;
const Background = styled.div`
  width: 100%;
  min-height: 25vh;
  background-color: rgb(61, 84, 102);
`;
const UserInformation = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid ${(props) => props.theme.colors.dark};
  margin-top: -50px;
`;
const WhenJoinedInfo = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.8rem;
  padding: 0.2rem 0;
`;
const ProfileLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.darkGray};
  margin-right: 0.4rem;
  &:hover {
    text-decoration: underline;
  }
`;
const ProfilePage = () => {
  const { userStore } = useRootStore();

  return useObserver(() => {
    return (
      <Wrapper>
        <Title>{userStore.userData?.userName} </Title>
        <ProfileInfoWrapper>
          <Background>
            {userStore.userData?.background ? (
              <BackgroundPhoto src={userStore.userData.background.url} />
            ) : null}
          </Background>
          <UserInformation>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Avatar
                src={
                  userStore.userData?.avatar
                    ? userStore.userData?.avatar.url
                    : Default
                }
              />
              <Button type="button">Set up profile</Button>
            </div>

            <UserName>{userStore.userData?.userName}</UserName>
            <Email>@{userStore.userData?.userName}</Email>
            <WhenJoinedInfo>
              <BsFillCalendarFill style={{ marginRight: "0.4rem" }} />
              Joined
              {dayjs(userStore.userData?.created).format(" MMMM YYYY")}
            </WhenJoinedInfo>
            <WhenJoinedInfo>
              <ProfileLink to="/followers">
                {userStore.userData?.followersCount} Followers
              </ProfileLink>
              <ProfileLink to="/following">
                {userStore.userData?.followingCount} Following
              </ProfileLink>
            </WhenJoinedInfo>
          </UserInformation>
        </ProfileInfoWrapper>
      </Wrapper>
    );
  });
};

export default ProfilePage;
