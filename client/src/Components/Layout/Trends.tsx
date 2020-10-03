import React from "react";
import styled from "styled-components";
import Tags from "./Tags";

const Wrapper = styled.div`
  width: 24%;
  border-radius: 1rem;
  background-color: #192734;
  height: fit-content;
  margin-left: 0.8rem;
`;
const Trends = () => {
  return (
    <Wrapper>
      <Tags />
    </Wrapper>
  );
};

export default Trends;
