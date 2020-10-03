import styled from "styled-components";

export const TrendWrapper = styled.div`
  padding: 0.6rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.hoverDark};
  }
`;
export const Tag = styled.h4`
  color: white;
  padding: 0.2rem 0;
`;
export const TrendingTitle = styled.p`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.6rem;
`;
export const Button = styled.button`
  background-color: inherit;
  color: ${(props) => props.theme.colors.secondary};
  border: none;
  font-size: 0.8rem;
  padding: 0.4rem 1rem;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
