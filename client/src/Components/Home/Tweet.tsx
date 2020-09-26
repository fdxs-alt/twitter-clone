import React, { useState } from "react";
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
  Container,
} from "../../Style/ComponentStyles/AllTwetsStyle";
import { UserStore } from "../../Store/UserStore";
import Modal from "../Modal";
import TweetInput from "./TweetInput";
import { useObserver } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
interface Props {
  tweet: any;
  userStore: UserStore;
  addComment: (dataToSend: FormData, tweet: any) => Promise<void>;
  handleLike: (id: string) => Promise<void>;
  handleRetweet: (id: string) => Promise<void>;
}

const Tweet: React.FC<Props> = ({
  tweet,
  userStore,
  addComment,
  handleLike,
  handleRetweet,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();
  const addPost = async (dataToSend: FormData) => {
    await addComment(dataToSend, tweet);
    setIsOpen(false);
  };
  return useObserver(() => {
    return (
      <>
        <Wrapper>
          <AvatarWrapper>
            <Avatar
              alt="userAvatar"
              src={tweet.user.avatar ? tweet.user.avatar.url : DefaultImage}
            />
          </AvatarWrapper>
          <TweetInfoWrapper>
            <div
              onClick={() => history.push(`/tweet/${tweet.tweet.id}`)}
              style={{ cursor: "pointer" }}
            >
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
            </div>
            <IconsContainer>
              <IconWrapper blue>
                <MessageIcon
                  fontSize={22}
                  tabIndex={0}
                  onClick={() => setIsOpen(true)}
                />
                {tweet.tweet.commentsCount !== 0 && (
                  <NumberInfo>{tweet.tweet.commentsCount}</NumberInfo>
                )}
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
        {isOpen && (
          <Modal open={isOpen} closeModal={() => setIsOpen(false)}>
            <Container>
              <Wrapper style={{ border: "none" }}>
                <AvatarWrapper>
                  <Avatar
                    alt="userAvatar"
                    src={
                      tweet.user.avatar ? tweet.user.avatar.url : DefaultImage
                    }
                  />
                </AvatarWrapper>
                <TweetInfoWrapper>
                  <Info>
                    <UserNameTitle>{tweet.user.userName}</UserNameTitle>
                    <Time>
                      {dayjs(tweet.tweet.issuedAt).format("DD.MM.YYYY")}
                    </Time>
                  </Info>
                  <TweetContent>{tweet.tweet.message}</TweetContent>
                </TweetInfoWrapper>
              </Wrapper>
              <TweetInput
                addPost={addPost}
                placeholder="Tweet your reply"
                isReply
              />
            </Container>
          </Modal>
        )}
      </>
    );
  });
};

export default Tweet;
