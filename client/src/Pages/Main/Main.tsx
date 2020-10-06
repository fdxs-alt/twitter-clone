import React from "react";
import AllTweets from "../../Components/Home/AllTweets";
import TweetInput from "../../Components/Home/TweetInput";
import { useRootStore } from "../../Store/RootStore";
import { Title } from "../../Style/ComponentStyles/SharedStyles";

const Main = () => {
  const { tweetStore } = useRootStore();

  return (
    <>
      <Title>Home</Title>
      <TweetInput
        addPost={(dataToSend: FormData) => tweetStore.addPost(dataToSend)}
        placeholder="What's happening"
      />
      <AllTweets />
    </>
  );
};

export default Main;
