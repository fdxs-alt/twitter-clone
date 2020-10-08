import dayjs from "dayjs";
import React, { useMemo } from "react";
import { AiOutlineHome, AiOutlineLink } from "react-icons/ai";
import { BsFillCalendarFill } from "react-icons/bs";
import { FaCity } from "react-icons/fa";
import { SiAboutDotMe } from "react-icons/si";

import {
  ProfileInfoWrapper,
  Background,
  BackgroundPhoto,
  UserInformation,
  WhenJoinedInfo,
  InfoContent,
  ProfileLink,
  Avatar,
} from "../Style/ComponentStyles/ProfilePageStyles";
import { Title } from "../Style/ComponentStyles/SharedStyles";
import { UserName, Email } from "../Style/ComponentStyles/SpecifcTweetStyles";
import Default from "../Images/default_profile_400x400.png";
import { useRootStore } from "../Store/RootStore";
import { useParams } from "react-router-dom";
import useSpecificUser from "../utils/hooks/useSpecificUser";

const SpecificUser = () => {
  const { userStore } = useRootStore();
  const params = useParams<{ id: string }>();
  const config = useMemo(() => userStore.setConfig(), [userStore]);
  const { loading, specificUser } = useSpecificUser(config, params.id);

  if (loading) return null;
  return (
    <>
      <Title>{specificUser?.userName} </Title>
      <ProfileInfoWrapper>
        <Background>
          {specificUser?.background ? (
            <BackgroundPhoto src={specificUser.background.url} />
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
              src={specificUser?.avatar ? specificUser?.avatar.url : Default}
            />
          </div>

          <UserName
            to={
              userStore.userData?.id === specificUser?.id
                ? `/profile`
                : `/users/${specificUser?.id}`
            }
          >
            {specificUser?.userName}
          </UserName>
          <Email>@{specificUser?.userName}</Email>
          <WhenJoinedInfo>
            <BsFillCalendarFill style={{ marginRight: "0.4rem" }} />
            Joined
            {dayjs(specificUser?.created).format(" MMMM YYYY")}
          </WhenJoinedInfo>
          {specificUser?.description && (
            <WhenJoinedInfo>
              <SiAboutDotMe style={{ marginRight: "0.4rem" }} />
              {specificUser?.description}
            </WhenJoinedInfo>
          )}
          <InfoContent>
            {specificUser?.country && (
              <WhenJoinedInfo>
                <AiOutlineHome style={{ marginRight: "0.4rem" }} />
                {specificUser?.country}
              </WhenJoinedInfo>
            )}
            {specificUser?.profileLink && (
              <WhenJoinedInfo>
                <AiOutlineLink style={{ marginRight: "0.4rem" }} />
                {specificUser?.profileLink}
              </WhenJoinedInfo>
            )}
            {specificUser?.city && (
              <WhenJoinedInfo>
                <FaCity style={{ marginRight: "0.4rem" }} />
                {specificUser?.city}
              </WhenJoinedInfo>
            )}
          </InfoContent>
          <WhenJoinedInfo>
            <ProfileLink to="/followers">
              {specificUser?.followersCount} Followers
            </ProfileLink>
            <ProfileLink to="/following">
              {specificUser?.followingCount} Following
            </ProfileLink>
          </WhenJoinedInfo>
        </UserInformation>
      </ProfileInfoWrapper>
    </>
  );
};

export default SpecificUser;
