import React, { useEffect, useState } from "react";
import { UserStore } from "../Store/UserStore";
import Axios from "../utils/Axios";
import {
  getAllPostCommentsURL,
  likeURL,
  postCommentURL,
  retweetUrL,
} from "../utils/Urls";
import Tweet from "./Home/Tweet";

interface Props {
  id: string;
  userStore: UserStore;
}

const Comments: React.FC<Props> = ({ id, userStore }) => {
  const [comments, setComments] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const addComment = async (dataToSend: FormData, tweet: any) => {
    try {
      const response = await Axios.post(
        postCommentURL(tweet.tweet.id),
        dataToSend,
        userStore.setFormDataConfig()
      );

      const element = comments.findIndex(
        (element: any) => element.tweet.id === tweet.tweet.id
      );

      let newTweets = [...comments];

      newTweets[element] = {
        user: { ...newTweets[element].user },
        tweet: { ...newTweets[element].tweet, commentsCount: response.data },
      };

      setComments(newTweets);
    } catch (error) {}
  };

  const handleLike = async (id: string) => {
    try {
      const response = await Axios.patch(
        likeURL(id),
        null,
        userStore.setConfig()
      );

      const element = comments.findIndex(
        (element: any) => element.tweet.id === id
      );

      let newTweets = [...comments];

      newTweets[element] = {
        user: { ...newTweets[element].user },
        tweet: { ...newTweets[element].tweet, likes: response.data },
      };

      setComments(newTweets);
    } catch (error) {}
  };

  const handleRetweet = async (id: string) => {
    try {
      const response = await Axios.patch(
        retweetUrL(id),
        null,
        userStore.setConfig()
      );

      const element = comments.findIndex(
        (element: any) => element.tweet.id === id
      );

      let newTweets = [...comments];
      newTweets[element] = {
        user: { ...newTweets[element].user },
        tweet: { ...newTweets[element].tweet, userRe: response.data },
      };

      setComments(newTweets);
    } catch (error) {}
  };
  useEffect(() => {
    const getALlComments = async () => {
      setLoading(true);
      try {
        const response = await Axios.get(
          getAllPostCommentsURL(id),
          userStore.setConfig()
        );
        setComments(response.data);
      } catch (error) {}
      setLoading(false);
    };

    getALlComments();
  }, [id, userStore]);

  if (loading) return null;

  return (
    <>
      {comments.map((comment: any) => (
        <Tweet
          tweet={comment}
          userStore={userStore}
          addComment={addComment}
          handleLike={handleLike}
          handleRetweet={handleRetweet}
          key={comment.tweet.id}
        />
      ))}
    </>
  );
};

export default Comments;
