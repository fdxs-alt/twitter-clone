import { useObserver } from "mobx-react-lite";
import React, { useState } from "react";
import { useRootStore } from "../Store/RootStore";
import { Title } from "../Style/ComponentStyles/SharedStyles";
import Default from "../Images/default_profile_400x400.png";
import { Button } from "../Style/ComponentStyles/RegisterPageStyles";
import {
  UserName,
  Email,
  Avatar,
} from "../Style/ComponentStyles/SpecifcTweetStyles";
import dayjs from "dayjs";
import ProfileModal from "../Components/UpdateProfileSteps/ProfileModal";
import { BsFillCalendarFill } from "react-icons/bs";
import { SiAboutDotMe } from "react-icons/si";
import {
  ProfileInfoWrapper,
  Background,
  UserInformation,
  WhenJoinedInfo,
  ProfileLink,
  BackgroundPhoto,
  InfoContent,
} from "../Style/ComponentStyles/ProfilePageStyles";
import { AiOutlineHome, AiOutlineLink } from "react-icons/ai";
import { FaCity } from "react-icons/fa";
import { TweetDataType } from "../Store/TweetStore";
import Tweet from "../Components/Home/Tweet";
import Axios from "../utils/Axios";
import { postCommentURL } from "../utils/Urls";

const ProfilePage = () => {
  const { userStore, tweetStore } = useRootStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLike = async (id: string) => {
    await tweetStore.handleLike(id);
  };

  const addComment = async (dataToSend: FormData, tweet: TweetDataType) => {
    const response = await Axios.post(
      postCommentURL(tweet.tweet.id),
      dataToSend,
      userStore.setFormDataConfig()
    );

    tweetStore.setCommentsCount(tweet.tweet.id, response.data);
  };

  const handleRetweet = async (id: string) => {
    await tweetStore.handleRetweet(id);
  };

  return useObserver(() => {
    const userTweets = tweetStore.getLoggedUserTweets();

    return (
      <>
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

            <UserName to={`/profile`}>{userStore.userData?.userName}</UserName>
            <Email>@{userStore.userData?.userName}</Email>
            <WhenJoinedInfo>
              <BsFillCalendarFill style={{ marginRight: "0.4rem" }} />
              Joined
              {dayjs(userStore.userData?.created).format(" MMMM YYYY")}
            </WhenJoinedInfo>
            {userStore.userData?.description && (
              <WhenJoinedInfo>
                <SiAboutDotMe style={{ marginRight: "0.4rem" }} />
                {userStore.userData?.description}
              </WhenJoinedInfo>
            )}
            <InfoContent>
              {userStore.userData?.country && (
                <WhenJoinedInfo>
                  <AiOutlineHome style={{ marginRight: "0.4rem" }} />
                  {userStore.userData?.country}
                </WhenJoinedInfo>
              )}
              {userStore.userData?.profileLink && (
                <WhenJoinedInfo>
                  <AiOutlineLink style={{ marginRight: "0.4rem" }} />
                  {userStore.userData?.profileLink}
                </WhenJoinedInfo>
              )}
              {userStore.userData?.city && (
                <WhenJoinedInfo>
                  <FaCity style={{ marginRight: "0.4rem" }} />
                  {userStore.userData?.city}
                </WhenJoinedInfo>
              )}
            </InfoContent>
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
        {userTweets.map((tweet) => (
          <Tweet
            key={tweet.tweet.id}
            tweet={tweet}
            userStore={userStore}
            addComment={addComment}
            handleLike={handleLike}
            handleRetweet={handleRetweet}
          />
        ))}
      </>
    );
  });
};

export default ProfilePage;
