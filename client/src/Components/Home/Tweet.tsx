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
import Modal from "../Layout/Modal";
import TweetInput from "./TweetInput";
import { useObserver } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { TweetDataType } from "../../Store/TweetStore";
interface Props {
  tweet: TweetDataType;
  userStore: UserStore;
  addComment: (dataToSend: FormData, tweet: TweetDataType) => Promise<void>;
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
            <Info>
              <UserNameTitle
                to={
                  userStore.userData?.id === tweet.user.id
                    ? `/profile`
                    : `/users/${tweet.user.id}`
                }
              >
                {tweet.user.userName}
              </UserNameTitle>
              <Time>{dayjs(tweet.tweet.issuedAt).format("DD.MM.YYYY")}</Time>
            </Info>
            <div
              onClick={() => history.push(`/tweet/${tweet.tweet.id}`)}
              style={{ cursor: "pointer" }}
            >
              <TweetContent>{tweet.tweet.message}</TweetContent>
              {tweet.tweet.images ? (
                <ImagesContainer quantity={tweet.tweet.images.length}>
                  {tweet.tweet.images?.map((image) => (
                    <Image src={image.url} key={image.id} />
                  ))}
                </ImagesContainer>
              ) : null}
              {tweet.tweet.gif ? (
                <video width="100%" muted autoPlay loop>
                  <Gif src={tweet.tweet.gif} />{" "}
                </video>
              ) : null}
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
                    (element) => element.id === userStore.userData?.id
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
          <Modal open={isOpen} closeModal={() => setIsOpen(false)} isPadding>
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
                    <UserNameTitle
                      to={
                        userStore.userData?.id === tweet.user.id
                          ? `/profile`
                          : `/dupa`
                      }
                    >
                      {tweet.user.userName}
                    </UserNameTitle>
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
