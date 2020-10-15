import React, { ChangeEvent, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { AddChatButton } from "../../Style/ComponentStyles/ChatStyles";
import { Title } from "../../Style/ComponentStyles/SharedStyles";

interface Props {
  close: () => void;
}
const TittleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.8rem;
`;
const SearchInput = styled.input`
  width: 100%;
  padding: 0.6rem;
  background-color: #232e3b;
  border: none;

  &::placeholder {
    color: ${props => props.theme.colors.darkGray}
  }
`;

const UsersSearch: React.FC<Props> = ({ close }) => {
  const [search, setSearch] = useState("");
  return (
    <div style={{ width: "100%" }}>
      <TittleWrapper>
        <AddChatButton type="button" onClick={close}>
          <AiOutlineClose fontSize={26} />
        </AddChatButton>
        <Title>New message</Title>
      </TittleWrapper>
      <SearchInput
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        placeholder="Search people"
      />
    </div>
  );
};

export default UsersSearch;
