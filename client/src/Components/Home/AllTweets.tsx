import React from "react";
import { useRootStore } from "../../Store/RootStore";
import Tweet from "./Tweet";
import { useObserver } from "mobx-react-lite";

import useAllTweets from "../../utils/hooks/useAllTweets";
import Loader from "../Loader";
const AllTweets = () => {
  const { userStore, tweetStore } = useRootStore();

  const { addComment, handleLike, handleRetweet } = useAllTweets(
    tweetStore,
    userStore
  );

  return useObserver(() => {
    if (tweetStore.tweetsLoading) return <Loader />;

    return (
      <>
        {tweetStore.tweetData.map((tweet) => (
          <Tweet
            key={tweet.tweet.id}
            tweet={tweet}
            userStore={userStore}
            addComment={addComment}
            handleLike={handleLike}
            handleRetweet={handleRetweet}
          />
        ))}
        {tweetStore.error && <h1>{tweetStore.error}</h1>}
      </>
    );
  });
};

export default AllTweets;
