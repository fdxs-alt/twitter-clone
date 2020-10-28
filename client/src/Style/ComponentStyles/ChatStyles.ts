import styled from "styled-components";

export const Container = styled.div`
  width: 35%;
  border-right: 1px solid ${(props) => props.theme.colors.hoverDark};

  & > div {
    border: 1px solid ${(props) => props.theme.colors.hoverDark};
  }
  & > form {
    border: 1px solid ${(props) => props.theme.colors.hoverDark};
    border-bottom: 10px solid ${(props) => props.theme.colors.hoverDark};
  }
`;
export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.8rem;
  align-items: center;
`;

export const SearchInput = styled.input`
  background-color: ${(props) => props.theme.colors.dark};
  color: white;
  width: 95%;
  border-radius: 1.5rem;
  padding: 0.9rem;
  font-size: 0.9rem;
  border: 1px solid ${(props) => props.theme.colors.dark};
  &::placeholder {
    color: ${(props) => props.theme.colors.darkGray};
  }

  &:focus,
  :hover {
    color: ${(props) => props.theme.colors.secondary};
    border: 1px solid ${(props) => props.theme.colors.secondary};
    outline: none;
  }
`;

export const AddChatButton = styled.button`
  background-color: inherit;
  color: ${(props) => props.theme.colors.secondary};
  border: none;
  cursor: pointer;
`;

export const TittleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.8rem;
`;
export const SearchInputModal = styled.input`
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
export const UserWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.darkGray};
  color: ${(props) => props.theme.colors.lightGray};
  font-size: 0.9rem;
  align-items: center;
  cursor: pointer;
  &:hover{
    background-color: ${props => props.theme.colors.tweetHover};
  }
`;
export const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: inherit;
  margin-right: 0.5rem;
`;