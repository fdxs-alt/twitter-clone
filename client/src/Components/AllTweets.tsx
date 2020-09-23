import Axios from "../utils/Axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRootStore } from "../Store/RootStore";
import { getAllTweetsURL } from "../utils/Urls";
import DefaultImage from "../Images/default_profile_400x400.png";
import { Avatar } from "../Style/ComponentStyles/TweetInputStyles";
import dayjs from "dayjs";
interface Props {
  setTweets: React.Dispatch<any>;
  tweets: any;
}
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  color: white;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.colors.hoverDark};
`;
const AvatarWrapper = styled.div`
  padding: 1rem;
  width: 10%;
`;
const TweetInfoWrapper = styled.div`
  padding: 0.5rem;
  width: 88%;
`;
const Info = styled.div`
  display: flex;
`;
const Time = styled.time`
  font-size: 0.8rem;
  padding: 0.4rem;
  color: ${(props) => props.theme.colors.darkGray};
`;
const UserNameTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;
const TweetContent = styled.p`
  font-size: 1rem;
`;
type ContainerProps = {
  quantity: number;
};
const ImagesContainer = styled.div<ContainerProps>`
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) =>
    props.quantity === 1 ? "60%" : "1fr 1fr"};
  grid-template-rows: ${(props) =>
    props.quantity === 1 ? "60%" : "auto auto"};
  justify-content: center;
  gap: 0.4rem;
  padding: 0.3rem 0.4rem;
  
`;
const Image = styled.img`
  width: 100%;
  min-height: 100%;
  object-fit: contain;
`;
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
            {tweet.tweet.images.length !== 0 && (
              <ImagesContainer quantity={tweet.tweet.images.length}>
                {tweet.tweet.images.map((image: any) => (
                  <Image src={image.url} key={image.id} loading="lazy" />
                ))}
              </ImagesContainer>
            )}
          </TweetInfoWrapper>
        </Wrapper>
      ))}
      {error && <h1>{error}</h1>}
    </>
  );
};

export default AllTweets;
