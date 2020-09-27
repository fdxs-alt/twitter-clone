import React, { useEffect, useState } from "react";
import { Wrapper, Title } from "../Style/ComponentStyles/SharedStyles";
import { useParams } from "react-router-dom";
import { useRootStore } from "../Store/RootStore";
import Comments from "./Comments";
import styled from "styled-components";
import DefaultImage from "../Images/default_profile_400x400.png";
import { ImagesContainer, Image } from "../Style/ComponentStyles/AllTwetsStyle";
import { getSpecifcTweetURL } from "../utils/Urls";
import Axios from "../utils/Axios";
import { Gif } from "../Style/ComponentStyles/TweetInputStyles";
const MainTweetWrapper = styled.div`
  width: 100%;
  padding: 0.9rem;
`;

const AvatarWrapper = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  width: 45px;
  border-radius: 50%;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.6rem;
`;
const UserName = styled.h4`
  color: white;
`;
const Email = styled.p`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.8rem;
`;
const ContentWrapper = styled.div`
  width: 100%;
`;
const TweetContent = styled.p`
  font-size: 1.5rem;
  color: white;
  padding: 0.2rem;
`;
const SpecificTweet = () => {
  const params: { id: string } = useParams();
  const [loading, setLoading] = useState(true);
  const [specificTweet, setSpecificTweet] = useState<any>(null);
  const { userStore } = useRootStore();

  useEffect(() => {
    setLoading(true);
    const getSpecifcTweet = async () => {
      try {
        const response = await Axios.get(
          getSpecifcTweetURL(params.id),
          userStore.setConfig()
        );

        setSpecificTweet(response.data);
        setLoading(false);
      } catch (error) {}
    };

    getSpecifcTweet();

    return () => {
      setSpecificTweet(null);
    };
  }, [userStore, params.id]);

  if (loading) return <h1>Loading...</h1>;
  else
    return (
      <Wrapper>
        <Title>Tweet</Title>
        <MainTweetWrapper>
          <AvatarWrapper>
            <Avatar
              alt="userAvatar"
              src={
                specificTweet.user.avatar
                  ? specificTweet.user.avatar.url
                  : DefaultImage
              }
            />
            <InfoWrapper>
              <UserName>{specificTweet.user.userName}</UserName>
              <Email>{specificTweet.user.email}</Email>
            </InfoWrapper>
          </AvatarWrapper>
          <ContentWrapper>
            <TweetContent>{specificTweet.tweet.message}</TweetContent>
            {specificTweet.tweet.images?.length !== 0 ? (
              <ImagesContainer quantity={specificTweet.tweet.images?.length}>
                {specificTweet.tweet.images?.map((image: any) => (
                  <Image src={image.url} key={image.id} />
                ))}
              </ImagesContainer>
            ) : null}
          </ContentWrapper>
          {specificTweet.tweet.gif ? (
            <video width="100%" muted autoPlay loop>
              <Gif src={specificTweet.tweet.gif} />
            </video>
          ) : null}
        </MainTweetWrapper>
        <Comments id={params.id} userStore={userStore} />
      </Wrapper>
    );
};

export default SpecificTweet;
