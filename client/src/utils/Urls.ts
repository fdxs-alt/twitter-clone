export const registerURL = "auth/register";
export const verifyURL = "auth/verify";
export const loginURL = "auth/login";
export const revokeURL = "auth/revoke";
export const logoutURL = "auth/logout";
export const getUserTweetsURL = "tweets";
export const getAllTweetsURL = "tweets/mytweets";
export const postTweetURL = "tweets/postTweet";
export const updateProfileURL = "auth/updateProfile";
export const getTrendingURL =
  "https://api.giphy.com/v1/gifs/trending?api_key=Q386e6Vj3A4LpLDWCy3EigWlv3i2fTjl&limit=24&rating=g";

export const getSearchURL = (search: string) => {
  return `https://api.giphy.com/v1/gifs/search?api_key=Q386e6Vj3A4LpLDWCy3EigWlv3i2fTjl&q=${search}&limit=24&offset=0&rating=g&lang=en`;
};
export const likeURL = (id: string) => {
  return `tweets/like/${id}`;
};
export const retweetUrL = (id: string) => {
  return `tweets/retweet/${id}`;
};
export const postCommentURL = (id: string) => {
  return `tweets/comment/${id}`;
};
export const getAllPostCommentsURL = (id: string) => {
  return `tweets/comments/${id}`;
};

export const getSpecifcTweetURL = (id: string) => {
  return `tweets/comment/${id}`;
};
export const getTagsURL = (skip: number) => {
  return `tweets/tags/${skip}`;
};
export const getUserToFollowURL = (skip: number) => {
  return `auth/follow/${skip}`;
};
export const followUserURL = (id: string) => {
  return `auth/follow/${id}`;
};
export const getSpecificUserURL = (id: string) => {
  return `auth/user/${id}`;
};
