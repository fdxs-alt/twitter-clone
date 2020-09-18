import React from "react";
import LoadingImage from "../Images/Twitter_Logo_WhiteOnImageMainLoading.svg";
import { Image, Wrapper } from "../Style/ComponentStyles/LoadingPageStyle";
const LoadingPage = () => {
  return (
    <Wrapper>
      <Image src={LoadingImage} alt="logo" />
    </Wrapper>
  );
};

export default LoadingPage;
