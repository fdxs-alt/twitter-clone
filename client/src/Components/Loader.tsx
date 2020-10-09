import React from "react";
import LoadingImage from "../Images/Twitter_Logo_WhiteOnImageMainLoading.svg";
import styled from "styled-components";

const Wrapper = styled.figure`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: none;
  min-height: 50%;
`;

 const Image = styled.img`
  width: 65px;
`;

const Loader = () => {
  return (
    <Wrapper>
      <Image src={LoadingImage} alt="logo" />
    </Wrapper>
  );
};

export default Loader;
