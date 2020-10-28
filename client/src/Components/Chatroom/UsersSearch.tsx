import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRootStore } from "../../Store/RootStore";
import {
  AddChatButton,
  TittleWrapper,
  UserWrapper,
  Image,
  SearchInputModal,
} from "../../Style/ComponentStyles/ChatStyles";
import { Title } from "../../Style/ComponentStyles/SharedStyles";
import { getSearchUsers } from "../../utils/API";
import Default from "../../Images/default_profile_400x400.png";
interface Props {
  close: () => void;
}

const UsersSearch: React.FC<Props> = ({ close }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<any>([]);
  const { userStore, chatStore } = useRootStore();
  const config = useMemo(() => userStore.setConfig(), [userStore]);

  const getSearch = async () => {
    if (!search) return;
    try {
      const response = await getSearchUsers(config, search);
      setUsers(response.data);
    } catch (error) {}
  };

  const handleClick = useCallback(
    async (id: string) => {
      await chatStore.createChat(id);
      close();
    },
    [userStore]
  );

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
      <SearchInputModal
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        placeholder="Search people"
      />
      {users.map((user: any) => (
        <UserWrapper key={user.id} onClick={() => handleClick(user.id)}>
          <Image src={user.avatar ? user.avatar.url : Default} />
          <div>
            <h4>{user.userName}</h4>
            <p style={{ fontSize: "0.6rem" }}>@{user.email}</p>
          </div>
        </UserWrapper>
      ))}
    </div>
  );
};

export default UsersSearch;
