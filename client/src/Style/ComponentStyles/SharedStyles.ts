import styled from "styled-components";

export const Wrapper = styled.section`
  width: 50%;
  & > div {
    border: 1px solid ${(props) => props.theme.colors.hoverDark};
  }
  & > form {
    border: 1px solid ${(props) => props.theme.colors.hoverDark};
    border-bottom: 10px solid ${(props) => props.theme.colors.hoverDark};
  }
`;
export const Title = styled.div`
  padding: 1rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
`;