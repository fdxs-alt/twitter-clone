import styled from "styled-components";

export const UserWrapper = styled.div`
  padding: 0.4rem;
  color: white;
  display: flex;
`;
export const UserTitle = styled.h4`
  padding: 0.2rem;
`;
export const Avatar = styled.img`
  background-color: ${(props) => props.theme.colors.primary};
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
export const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;
`;
