import React, { useEffect, useMemo, useState } from "react";
import { useRootStore } from "../../Store/RootStore";
import { getAllTweetsURL, likeURL, retweetUrL } from "../../utils/Urls";

import Axios from "../../utils/Axios";
import Tweet from "./Tweet";
interface Props {
  setTweets: React.Dispatch<any>;
  tweets: any;
}

const AllTweets: React.FC<Props> = ({ setTweets, tweets }) => {
  const { userStore } = useRootStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setCommentsCount = async (id: string, data: number) => {
    const element = tweets.findIndex((element: any) => element.tweet.id === id);

    let newTweets = [...tweets];
    newTweets[element] = {
      user: { ...newTweets[element].user },
      tweet: { ...newTweets[element].tweet, commentsCount: data },
    };
    setTweets(newTweets);
  };

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
          <Tweet
            key={tweet.tweet.id}
            tweet={tweet}
            userStore={userStore}
            handleLike={handleLike}
            handleRetweet={handleRetweet}
            setCommentsCount={setCommentsCount}
          />
        ))}
        {error && <h1>{error}</h1>}
      </>
    );
  }, [tweets, loading]);
};

export default AllTweets;
