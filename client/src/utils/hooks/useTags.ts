import Axios from "../Axios";
import { useState, useEffect } from "react";
import { UserStore } from "../../Store/UserStore";
import { getTagsURL } from "../Urls";

type Tag = {
  id: string;
  text: string;
};
function useTags(userStore: UserStore) {
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<Tag[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getTags = async () => {
      setLoading(true);
      if (!userStore.accessToken) return;

      try {
        const data = await Axios.get(getTagsURL(page), userStore.setConfig());
        setTags((prev) => [...data.data, ...prev]);
      } catch (error) {}
      setLoading(false);
    };

    getTags();
  }, [userStore, page]);

  return { loading, tags, page, setPage };
}
export default useTags;
