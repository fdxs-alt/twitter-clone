import React, { useEffect } from "react";
import { useRootStore } from "../../Store/RootStore";
import Tweet from "./Tweet";
import { useObserver } from "mobx-react-lite";

const AllTweets = () => {
  const { userStore, tweetStore } = useRootStore();

  useEffect(() => {
    tweetStore.getTweets();
  }, []);

  return useObserver(() => {
    if (tweetStore.tweetsLoading) return <h1>Loading...</h1>;

    return (
      <>
        {tweetStore.tweetData.map((tweet: any) => (
          <Tweet key={tweet.tweet.id} tweet={tweet} userStore={userStore} />
        ))}
        {tweetStore.error && <h1>{tweetStore.error}</h1>}
      </>
    );
  });
};

export default AllTweets;
