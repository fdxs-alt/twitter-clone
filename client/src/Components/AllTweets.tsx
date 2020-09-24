import Axios from "../utils/Axios";
import React, { useEffect, useState } from "react";
import { useRootStore } from "../Store/RootStore";
import { getAllTweetsURL } from "../utils/Urls";
import DefaultImage from "../Images/default_profile_400x400.png";
import { Avatar, Gif } from "../Style/ComponentStyles/TweetInputStyles";
import dayjs from "dayjs";
import { useObserver } from "mobx-react-lite";
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
} from "../Style/ComponentStyles/AllTwetsStyle";
interface Props {
  setTweets: React.Dispatch<any>;
  tweets: any;
}

const AllTweets: React.FC<Props> = ({ setTweets, tweets }) => {
  const { userStore } = useRootStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return useObserver(() => {
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
                <IconWrapper blue>
                  <MessageIcon fontSize={22} tabIndex={0} />

                  {tweet.tweet.userRe.length !== 0 && (
                    <NumberInfo>{tweet.tweet.userRe.length}</NumberInfo>
                  )}
                </IconWrapper>
                <IconWrapper>
                  <RetweetIcon fontSize={22} tabIndex={0} />
                  {tweet.tweet.userRe.length !== 0 && (
                    <NumberInfo>{tweet.tweet.userRe.length}</NumberInfo>
                  )}
                </IconWrapper>
                <IconWrapper red>
                  <LikeIcon fontSize={22} tabIndex={0} />
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
  });
};

export default AllTweets;
