import React from "react";
import { Wrapper, Title } from "../Style/ComponentStyles/SharedStyles";
import { useParams } from "react-router-dom";
import { useRootStore } from "../Store/RootStore";
import { toJS } from "mobx";
import Comments from "./Comments";
const SpecificTweet = () => {
  const params: { id: string } = useParams();
  const { tweetStore, userStore } = useRootStore();
  const specificTweet = toJS(tweetStore.getSpecifcTweet(params.id)[0]);
  console.log(specificTweet);
  return (
    <Wrapper>
      <Title>Tweet</Title>
      <Comments id={params.id} userStore={userStore} />
    </Wrapper>
  );
};

export default SpecificTweet;
