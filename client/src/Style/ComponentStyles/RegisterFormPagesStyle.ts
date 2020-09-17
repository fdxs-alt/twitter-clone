import styled from "styled-components";

export const PageOneWrapper = styled.div`
  width: 100%;
  & > div {
    margin-bottom: 2.5rem;
  }
`;
export const DateInputWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  & > div {
    margin-right: 2rem;
  }
`;
export const DateInfo = styled.p`
  color: ${(props) => props.theme.colors.lightGray};
  padding: 0.6rem 0;
`;
export const Error = styled.div`
  color: red;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 0.3rem;
`;
