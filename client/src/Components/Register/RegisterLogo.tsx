import React from "react";
import { BsSearch, BsPeople, BsChat } from "react-icons/bs";
import {
  LogoContainer,
  LogoInfos,
  IconWithTextContainer,
  LogoInfo,
} from "../../Style/ComponentStyles/RegisterPageStyles";

const RegisterLogo = () => {
  return (
    <LogoContainer>
      <LogoInfos>
        <IconWithTextContainer>
          <BsSearch fontSize={28} />
          <LogoInfo>Follow your interests.</LogoInfo>
        </IconWithTextContainer>
        <IconWithTextContainer>
          <BsPeople fontSize={28} />
          <LogoInfo>Hear what people are talking about.</LogoInfo>
        </IconWithTextContainer>
        <IconWithTextContainer>
          <BsChat fontSize={28} />
          <LogoInfo>Join the conversation.</LogoInfo>
        </IconWithTextContainer>
      </LogoInfos>
    </LogoContainer>
  );
};

export default RegisterLogo;
