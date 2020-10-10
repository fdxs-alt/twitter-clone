import dayjs from "dayjs";
import React, { useCallback, useMemo } from "react";
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
import useSpecificUser, { User } from "../utils/hooks/useSpecificUser";
import Loader from "../Components/Loader";
import Tweet from "../Components/Home/Tweet";
import { TweetDataType } from "../Store/TweetStore";
import {
  comment,
  getNewComments,
  getNewLikes,
  getNewRetweets,
  like,
  retweet,
} from "../utils/API";

const SpecificUser = () => {
  const { userStore } = useRootStore();
  const { id } = useParams<{ id: string }>();
  const config = useMemo(() => userStore.setConfig(), [userStore]);
  const { loading, specificUser, setSpecificUser } = useSpecificUser(
    config,
    id
  );

  const addComment = useCallback(
    async (dataToSend: FormData, tweet: TweetDataType) => {
      try {
        const response = await comment(
          tweet.tweet.id,
          dataToSend,
          userStore.setFormDataConfig()
        );

        const { tweets, ...rest } = specificUser as User;

        const newTweets = getNewComments(tweets, response.data, tweet.tweet.id);

        setSpecificUser({
          ...rest,
          tweets: newTweets,
        });
      } catch (error) {}
    },
    [config, userStore, specificUser]
  );

  const handleLike = useCallback(
    async (id: string) => {
      try {
        const response = await like(id, config);

        const { tweets, ...rest } = specificUser as User;

        const newTweets = getNewLikes(tweets, response.data, id);

        setSpecificUser({
          ...rest,
          tweets: newTweets,
        });
      } catch (error) {}
    },
    [config, userStore, specificUser]
  );

  const handleRetweet = useCallback(
    async (id: string) => {
      try {
        const response = await retweet(id, config);

        const { tweets, ...rest } = specificUser as User;

        const newTweets = getNewRetweets(tweets, response.data, id);

        setSpecificUser({
          ...rest,
          tweets: newTweets,
        });
      } catch (error) {}
    },
    [config, userStore, specificUser]
  );

  if (loading) return <Loader />;
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
            <ProfileLink to={`/followers/${specificUser?.id}`}>
              {specificUser?.followersCount} Followers
            </ProfileLink>
            <ProfileLink to={`/following/${specificUser?.id}`}>
              {specificUser?.followingCount} Following
            </ProfileLink>
          </WhenJoinedInfo>
        </UserInformation>
        {specificUser?.tweets.map((tweet, index) => {
          const { tweets, ...rest } = specificUser;
          const object: TweetDataType = {
            user: rest,
            tweet,
          };
          return (
            <Tweet
              key={tweet.id}
              tweet={object}
              userStore={userStore}
              addComment={addComment}
              handleLike={handleLike}
              handleRetweet={handleRetweet}
            />
          );
        })}
      </ProfileInfoWrapper>
    </>
  );
};

export default SpecificUser;
