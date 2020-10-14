import {
  getChatsURL,
  likeURL,
  postCommentURL,
  postTweetURL,
  retweetUrL,
} from "./Urls";
import Axios from "./Axios";
import { AxiosRequestConfig } from "axios";
import { Tweet } from "../Store/TweetStore";

export async function like(id: string, config: AxiosRequestConfig) {
  const response = await Axios.patch(likeURL(id), null, config);
  return response;
}

export async function post(dataToSend: FormData, config: AxiosRequestConfig) {
  const response = await Axios.post(postTweetURL, dataToSend, config);
  return response;
}

export async function retweet(id: string, config: AxiosRequestConfig) {
  const response = await Axios.patch(retweetUrL(id), null, config);
  return response;
}
export async function comment(
  id: string,
  dataToSend: FormData,
  config: AxiosRequestConfig
) {
  const response = await Axios.post(postCommentURL(id), dataToSend, config);
  return response;
}

export function getNewLikes(tweets: Tweet[], data: any, id: string) {
  let newTweets = [...tweets];
  const element = tweets.findIndex((element) => element.id === id);

  newTweets[element as number] = {
    ...newTweets[element as number],
    likes: data,
  };

  return newTweets;
}
export function getNewRetweets(tweets: Tweet[], data: any, id: string) {
  let newTweets = [...tweets];
  const element = tweets.findIndex((element) => element.id === id);

  newTweets[element as number] = {
    ...newTweets[element as number],
    userRe: data,
  };

  return newTweets;
}

export function getNewComments(tweets: Tweet[], data: any, id: string) {
  let newTweets = [...tweets];
  const element = tweets.findIndex((element) => element.id === id);

  newTweets[element as number] = {
    ...newTweets[element as number],
    commentsCount: data,
  };

  return newTweets;
}
export async function getChats(config: AxiosRequestConfig) {
  const response = await Axios.get(getChatsURL, config);

  return response;
}
