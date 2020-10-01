import { useObserver } from "mobx-react-lite";
import React, { useState } from "react";
import { useRootStore } from "../Store/RootStore";
import { Title, Wrapper } from "../Style/ComponentStyles/SharedStyles";
import Default from "../Images/default_profile_400x400.png";
import { Button } from "../Style/ComponentStyles/RegisterPageStyles";
import {
  UserName,
  Email,
  Avatar,
} from "../Style/ComponentStyles/SpecifcTweetStyles";
import dayjs from "dayjs";
import { BsFillCalendarFill } from "react-icons/bs";
import ProfileModal from "../Components/ProfileModal";
import {
  ProfileInfoWrapper,
  Background,
  UserInformation,
  WhenJoinedInfo,
  ProfileLink,
  BackgroundPhoto,
} from "../Style/ComponentStyles/ProfilePageStyles";

const ProfilePage = () => {
  const { userStore } = useRootStore();
  const [isOpen, setIsOpen] = useState(false);

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
              <Button type="button" onClick={() => setIsOpen(!isOpen)}>
                Set up profile
              </Button>
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
        {isOpen && (
          <ProfileModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
        )}
      </Wrapper>
    );
  });
};

export default ProfilePage;
