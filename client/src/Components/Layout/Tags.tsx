import { useObserver } from "mobx-react-lite";
import React from "react";
import { useRootStore } from "../../Store/RootStore";
import { useHistory } from "react-router-dom";
import {
  TrendWrapper,
  TrendingTitle,
  Tag,
  Button,
} from "../../Style/ComponentStyles/TagStyles";
import useTags from "../../utils/hooks/useTags";

const Tags = () => {
  const { userStore } = useRootStore();
  const { loading, setPage, tags } = useTags(userStore);
  const history = useHistory();

  return useObserver(() => {
    if (loading) return <div>Loading...</div>;
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

          {tags.length % 5 === 0 && (
            <Tag>
              <Button type="button" onClick={() => setPage((prev) => prev + 5)}>
                Show more
              </Button>
            </Tag>
          )}
        </div>
      );
  });
};

export default Tags;
