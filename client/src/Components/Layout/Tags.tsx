import { useObserver } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useRootStore } from "../../Store/RootStore";
import Axios from "../../utils/Axios";
import { getTagsURL } from "../../utils/Urls";
import { useHistory } from "react-router-dom";
import {
  TrendWrapper,
  TrendingTitle,
  Tag,
  Button,
} from "../../Style/ComponentStyles/TagStyles";

const Tags = () => {
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<any>([]);
  const { userStore } = useRootStore();
  const [page, setPage] = useState(0);
  const history = useHistory();
  useEffect(() => {
    const getTags = async () => {
      setLoading(true);
      if (!userStore.accessToken) return;

      try {
        const data = await Axios.get(getTagsURL(page), userStore.setConfig());
        setTags((prev: any) => [...data.data, ...prev]);
      } catch (error) {}
      setLoading(false);
    };

    getTags();
  }, [userStore, page]);

  return useObserver(() => {
    if (loading || userStore.revokeLoading) return <div>Loading...</div>;
    else
      return (
        <div>
          {tags.map((tag: any) => (
            <TrendWrapper
              key={tag.id}
              onClick={() => history.push(`/tag/${tag.id}`)}
            >
              <TrendingTitle>Trending now</TrendingTitle>
              <Tag>{tag.text}</Tag>
              {tag.count > 20 && <TrendingTitle>{tag.count}</TrendingTitle>}
            </TrendWrapper>
          ))}
          <Tag>
            <Button type="button" onClick={() => setPage((prev) => prev + 5)}>
              Show more
            </Button>
          </Tag>
        </div>
      );
  });
};

export default Tags;
