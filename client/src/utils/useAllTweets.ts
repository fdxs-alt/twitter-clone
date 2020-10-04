import { UserStore } from "./../Store/UserStore";
import { TweetStore } from "../Store/TweetStore";
import Axios from "./Axios";
import { useEffect } from "react";
import { postCommentURL } from "./Urls";

function useAllTweets(tweetStore: TweetStore, userStore: UserStore) {
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

  return { addComment, handleLike, handleRetweet };
}

export default useAllTweets;
