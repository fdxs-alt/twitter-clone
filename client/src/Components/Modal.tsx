import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;
interface Props {
  open: boolean;
  closeModal: () => void;
}
const Modal: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  open,
  closeModal,
}) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Modal;
