import React, { useRef } from "react";
import {
  Wrapper,
  ModalContent,
} from "../Style/ComponentStyles/RegisterFormStyles";
import useClickOutside from "../utils/useClickOutside";

interface Props {
  open: boolean;
  closeModal: () => void;
}
const Modal: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  open,
  closeModal,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    closeModal();
  });

  return (
    <Wrapper>
      <ModalContent ref={ref}>{children}</ModalContent>
    </Wrapper>
  );
};

export default Modal;
