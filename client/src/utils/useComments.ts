import Axios from "./Axios";
import { useState, useCallback, useEffect } from "react";
import { UserStore } from "./../Store/UserStore";
import {
  postCommentURL,
  likeURL,
  retweetUrL,
  getAllPostCommentsURL,
} from "./Urls";

function useComments(userStore: UserStore, id: string) {
  const [comments, setComments] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const addComment = useCallback(
    async (dataToSend: FormData, tweet: any) => {
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
    },
    [comments, userStore]
  );

  const handleLike = useCallback(
    async (id: string) => {
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
    },
    [comments, userStore]
  );

  const handleRetweet = useCallback(
    async (id: string) => {
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
    },
    [comments, userStore]
  );

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
    return () => {};
  }, [id, userStore]);

  return { loading, comments, addComment, handleLike, handleRetweet };
}

export default useComments;
