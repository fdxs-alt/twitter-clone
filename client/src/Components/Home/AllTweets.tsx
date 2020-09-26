import React, { useEffect } from "react";
import { useRootStore } from "../../Store/RootStore";
import Tweet from "./Tweet";
import { useObserver } from "mobx-react-lite";
import { postCommentURL } from "../../utils/Urls";
import Axios from "../../utils/Axios";
const AllTweets = () => {
  const { userStore, tweetStore } = useRootStore();

  const addComment = async (dataToSend: FormData, tweet: any) => {
    const response = await Axios.post(
      postCommentURL(tweet.tweet.id),
      dataToSend,
      userStore.setFormDataConfig()
    );

    tweetStore.setCommentsCount(tweet.tweet.id, response.data);
  };

  const handleLike = async (id: string) => {
    await tweetStore.handleLike(id);
  };

  const handleRetweet = async (id: string) => {
    await tweetStore.handleRetweet(id);
  };

  useEffect(() => {
    tweetStore.getTweets();
  }, []);

  return useObserver(() => {
    if (tweetStore.tweetsLoading) return <h1>Loading...</h1>;

    return (
      <>
        {tweetStore.tweetData.map((tweet: any) => (
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
