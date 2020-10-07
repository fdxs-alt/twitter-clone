import React from "react";
import { Title } from "../Style/ComponentStyles/SharedStyles";
import { useParams } from "react-router-dom";
import { useRootStore } from "../Store/RootStore";
import Comments from "./Comments";
import DefaultImage from "../Images/default_profile_400x400.png";
import { ImagesContainer, Image } from "../Style/ComponentStyles/AllTwetsStyle";
import { Gif } from "../Style/ComponentStyles/TweetInputStyles";
import dayjs from "dayjs";
import {
  AvatarWrapper,
  ContentWrapper,
  DateInfo,
  Email,
  InfoWrapper,
  MainTweetWrapper,
  Time,
  TweetContent,
  UserName,
} from "../Style/ComponentStyles/SpecifcTweetStyles";
import useSpecificTweet from "../utils/hooks/useSpecificTweet";
import { Avatar } from "../Style/ComponentStyles/FollowUserStyles";

const SpecificTweet = () => {
  const params: { id: string } = useParams();
  const { userStore } = useRootStore();
  const { loading, specificTweet } = useSpecificTweet(userStore, params.id);

  if (loading) return <h1>Loading...</h1>;
  else
    return (
      <>
        <Title>Tweet</Title>
        <MainTweetWrapper>
          <AvatarWrapper>
            <Avatar
              alt="userAvatar"
              src={
                specificTweet?.user.avatar
                  ? specificTweet.user.avatar.url
                  : DefaultImage
              }
            />
            <InfoWrapper>
              <UserName>{specificTweet?.user.userName}</UserName>
              <Email>{specificTweet?.user.email}</Email>
            </InfoWrapper>
          </AvatarWrapper>
          <ContentWrapper>
            <TweetContent>{specificTweet?.tweet.message}</TweetContent>
            {specificTweet?.tweet.images ? (
              <ImagesContainer quantity={specificTweet?.tweet.images?.length}>
                {specificTweet?.tweet.images.map((image) => (
                  <Image src={image.url} key={image.id} />
                ))}
              </ImagesContainer>
            ) : null}
          </ContentWrapper>
          {specificTweet?.tweet.gif ? (
            <video width="100%" muted autoPlay loop>
              <Gif src={specificTweet.tweet.gif} />
            </video>
          ) : null}
          <DateInfo>
            <Time>
              {dayjs(specificTweet?.tweet.issuedAt).format(
                "h:mm A MMMM D, YYYY"
              )}
            </Time>
          </DateInfo>
        </MainTweetWrapper>

        <Comments id={params.id} userStore={userStore} />
      </>
    );
};

export default SpecificTweet;
