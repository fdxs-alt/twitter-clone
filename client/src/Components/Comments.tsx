import React from "react";
import { UserStore } from "../Store/UserStore";
import useComments from "../utils/hooks/useComments";
import Tweet from "./Home/Tweet";

interface Props {
  id: string;
  userStore: UserStore;
}

const Comments: React.FC<Props> = ({ id, userStore }) => {
  const {
    addComment,
    comments,
    handleRetweet,
    loading,
    handleLike,
  } = useComments(userStore, id);

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
