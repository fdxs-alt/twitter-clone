import React from "react";
import styled from "styled-components";
import FollowUsers from "./FollowUsers";
import Tags from "./Tags";

const TrendsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 24%;
`;
const Wrapper = styled.div`
  margin: 1rem 0;
  border-radius: 1rem;
  background-color: #192734;
  height: fit-content;
  margin-left: 0.8rem;
`;
const Trends = () => {
  return (
    <TrendsWrapper>
      <Wrapper>
        <Tags />
      </Wrapper>
      <Wrapper>
        <FollowUsers />
      </Wrapper>
    </TrendsWrapper>
  );
};

export default Trends;
