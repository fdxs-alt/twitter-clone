import React, { useEffect, useState } from "react";
import { UserStore } from "../Store/UserStore";
import Axios from "../utils/Axios";
import { getAllPostCommentsURL } from "../utils/Urls";
interface Props {
  id: string;
  userStore: UserStore;
}
const Comments: React.FC<Props> = ({ id, userStore }) => {
  const [comments, setComments] = useState<any>([]);
  const [loading, setLoading] = useState(false);
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
    <div>
      {comments.map((comment: any) => (
        <h1>b</h1>
      ))}
    </div>
  );
};

export default Comments;
