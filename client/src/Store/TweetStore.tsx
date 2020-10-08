import { action, observable, runInAction } from "mobx";
import {
  getAllTweetsURL,
  likeURL,
  postTweetURL,
  retweetUrL,
} from "../utils/Urls";
import { UserData, UserStore } from "./UserStore";
import Axios from "../utils/Axios";

export interface Tweet {
  commentsCount: number;
  gif: string;
  id: string;
  images: [
    {
      id: string;
      key: string;
      url: string;
      created: string;
      updated: string;
    }
  ];
  issuedAt: string;
  likes: string[];
  mainTweet?: Tweet[];
  message: string;
  tags: [
    {
      id: string;
      text: string;
    }
  ];
  userRe: UserData[];
}

export interface TweetDataType {
  user: UserData;
  tweet: Tweet;
}
export class TweetStore {
  @observable tweetsLoading = false;
  @observable tweetData: TweetDataType[] = [];
  @observable error = "";

  constructor(private userStore: UserStore) {}

  @action async getTweets() {
    this.tweetsLoading = true;
    try {
      const response = await Axios.get(
        getAllTweetsURL,
        this.userStore.setConfig()
      );

      runInAction(() => {
        this.tweetData = response.data;
      });
    } catch (error) {
      this.error = error.response.message;
    }
    this.tweetsLoading = false;
  }
  @action
  async handleLike(id: string) {
    try {
      const response = await Axios.patch(
        likeURL(id),
        null,
        this.userStore.setConfig()
      );

      const element = this.tweetData.findIndex(
        (element) => element.tweet.id === id
      );

      let newTweets = [...this.tweetData];

      newTweets[element] = {
        user: { ...newTweets[element].user },
        tweet: { ...newTweets[element].tweet, likes: response.data },
      };

      runInAction(() => {
        this.tweetData = newTweets;
      });
    } catch (error) {}
  }
  @action
  async handleRetweet(id: string) {
    try {
      const response = await Axios.patch(
        retweetUrL(id),
        null,
        this.userStore.setConfig()
      );

      const element = this.tweetData.findIndex(
        (element) => element.tweet.id === id
      );

      let newTweets = [...this.tweetData];
      newTweets[element] = {
        user: { ...newTweets[element].user },
        tweet: { ...newTweets[element].tweet, userRe: response.data },
      };

      runInAction(() => {
        this.tweetData = newTweets;
      });
    } catch (error) {}
  }

  @action
  async setCommentsCount(id: string, data: number) {
    const element = this.tweetData.findIndex(
      (element) => element.tweet.id === id
    );

    let newTweets = [...this.tweetData];
    newTweets[element] = {
      user: { ...newTweets[element].user },
      tweet: { ...newTweets[element].tweet, commentsCount: data },
    };
    runInAction(() => {
      this.tweetData = newTweets;
    });
  }

  @action
  async addPost(dataToSend: FormData) {
    try {
      const response = await Axios.post(
        postTweetURL,
        dataToSend,
        this.userStore.setConfig()
      );
      runInAction(() => {
        this.tweetData = [response.data, ...this.tweetData];
      });
    } catch (error) {}
  }

  getSpecifcTweet(id: string) {
    return this.tweetData.filter((data) => data.tweet.id === id);
  }

  getLoggedUserTweets() {
    return this.tweetData.filter(
      (data) => data.user.id === this.userStore.userData?.id
    );
  }
}
