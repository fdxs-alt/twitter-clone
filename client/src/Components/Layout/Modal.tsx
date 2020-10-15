import React, { useRef } from "react";
import {
  Wrapper,
  ModalContent,
} from "../../Style/ComponentStyles/RegisterFormStyles";
import useClickOutside from "../../utils/hooks/useClickOutside";

interface Props {
  open: boolean;
  closeModal: () => void;
  isPadding: boolean;
}
const Modal: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  open,
  closeModal,
  isPadding,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    closeModal();
  });

  return (
    <Wrapper>
      <ModalContent ref={ref} isPadding={isPadding}>
        {children}
      </ModalContent>
    </Wrapper>
  );
};

export default Modal;
