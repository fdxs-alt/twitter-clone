import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { useRootStore } from "../../Store/RootStore";
import { AddChatButton } from "../../Style/ComponentStyles/ChatStyles";
import { Title } from "../../Style/ComponentStyles/SharedStyles";
import { getSearchUsers } from "../../utils/API";

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
  border: 1px solid #232e3b;
  color: white;
  &::placeholder {
    color: ${(props) => props.theme.colors.darkGray};
  }

  outline: none;
  &:focus {
    border: 1px solid ${(props) => props.theme.colors.darkGray};
  }
`;
const UserWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.darkGray};
  color: ${(props) => props.theme.colors.lightGray};
  font-size: 0.9rem;
`;

const UsersSearch: React.FC<Props> = ({ close }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<any>([]);
  const { userStore } = useRootStore();
  const config = useMemo(() => userStore.setConfig(), [userStore]);

  const getSearch = async () => {
    if (!search) return;
    try {
      const response = await getSearchUsers(config, search);
      setUsers(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getSearch();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search]);

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
      {users.map((user: any) => (
        <UserWrapper key={user.id}>{user.userName}</UserWrapper>
      ))}
    </div>
  );
};

export default UsersSearch;
