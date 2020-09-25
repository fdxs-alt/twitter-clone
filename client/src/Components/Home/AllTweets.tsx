import React, { useEffect, useMemo, useState } from "react";
import { useRootStore } from "../../Store/RootStore";
import { getAllTweetsURL, likeURL, retweetUrL } from "../../utils/Urls";
import DefaultImage from "../../Images/default_profile_400x400.png";
import { Avatar, Gif } from "../../Style/ComponentStyles/TweetInputStyles";
import dayjs from "dayjs";

import {
  Wrapper,
  AvatarWrapper,
  TweetInfoWrapper,
  Info,
  UserNameTitle,
  TweetContent,
  ImagesContainer,
  Time,
  Image,
  IconsContainer,
  IconWrapper,
  LikeIcon,
  MessageIcon,
  MoreActionsIcon,
  NumberInfo,
  RetweetIcon,
} from "../../Style/ComponentStyles/AllTwetsStyle";
import Axios from "../../utils/Axios";
interface Props {
  setTweets: React.Dispatch<any>;
  tweets: any;
}

const AllTweets: React.FC<Props> = ({ setTweets, tweets }) => {
  const { userStore } = useRootStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLike = async (id: string) => {
    try {
      const response = await Axios.patch(
        likeURL(id),
        null,
        userStore.setConfig()
      );

      const element = tweets.findIndex(
        (element: any) => element.tweet.id === id
      );

      let newTweets = [...tweets];
      newTweets[element] = {
        user: { ...newTweets[element].user },
        tweet: { ...newTweets[element].tweet, likes: response.data },
      };
      setTweets(newTweets);
    } catch (error) {}
  };

  const handleRetweet = async (id: string) => {
    try {
      const response = await Axios.patch(
        retweetUrL(id),
        null,
        userStore.setConfig()
      );

      const element = tweets.findIndex(
        (element: any) => element.tweet.id === id
      );

      let newTweets = [...tweets];
      newTweets[element] = {
        user: { ...newTweets[element].user },
        tweet: { ...newTweets[element].tweet, userRe: response.data },
      };
      setTweets(newTweets);
    } catch (error) {}
  };

  useEffect(() => {
    const getAllTweets = async () => {
      try {
        setLoading(true);
        const response = await Axios.get(
          getAllTweetsURL,
          userStore.setConfig()
        );
        setTweets(response.data);
        console.log(response);
      } catch (error) {
        setError(error.response.message);
      }
      setLoading(false);
    };
    getAllTweets();
  }, []);

  return useMemo(() => {
    if (loading) return <h1>Loading...</h1>;

    return (
      <>
        {tweets.map((tweet: any) => (
          <Wrapper key={tweet.tweet.id}>
            <AvatarWrapper>
              <Avatar
                alt="userAvatar"
                src={tweet.user.avatar ? tweet.user.avatar.url : DefaultImage}
              />
            </AvatarWrapper>
            <TweetInfoWrapper>
              <Info>
                <UserNameTitle>{tweet.user.userName}</UserNameTitle>
                <Time>{dayjs(tweet.tweet.issuedAt).format("DD.MM.YYYY")}</Time>
              </Info>
              <TweetContent>{tweet.tweet.message}</TweetContent>
              {tweet.tweet.images?.length !== 0 ? (
                <ImagesContainer quantity={tweet.tweet.images?.length}>
                  {tweet.tweet.images?.map((image: any) => (
                    <Image src={image.url} key={image.id} loading="lazy" />
                  ))}
                </ImagesContainer>
              ) : null}
              {tweet.tweet.gif ? <Gif src={tweet.tweet.gif} alt="gif" /> : null}
              <IconsContainer>
                <IconWrapper blue done>
                  <MessageIcon fontSize={22} tabIndex={0} />
                </IconWrapper>
                <IconWrapper
                  done={
                    tweet.tweet.userRe.findIndex(
                      (element: any) => element.id === userStore.userData?.id
                    ) !== -1
                  }
                >
                  <RetweetIcon
                    fontSize={22}
                    tabIndex={0}
                    onClick={() => handleRetweet(tweet.tweet.id)}
                  />
                  {tweet.tweet.userRe.length !== 0 && (
                    <NumberInfo>{tweet.tweet.userRe.length}</NumberInfo>
                  )}
                </IconWrapper>
                <IconWrapper
                  red
                  done={tweet.tweet.likes.includes(userStore.userData!.id)}
                >
                  <LikeIcon
                    fontSize={22}
                    tabIndex={0}
                    onClick={() => handleLike(tweet.tweet.id)}
                  />
                  {tweet.tweet.likes.length !== 0 && (
                    <NumberInfo>{tweet.tweet.likes.length}</NumberInfo>
                  )}
                </IconWrapper>
                <IconWrapper blue>
                  <MoreActionsIcon fontSize={22} tabIndex={0} />
                </IconWrapper>
              </IconsContainer>
            </TweetInfoWrapper>
          </Wrapper>
        ))}
        {error && <h1>{error}</h1>}
      </>
    );
  }, [tweets, loading]);
};

export default AllTweets;
