import React, { useState } from "react";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

const StyledModal : any = Modal.styled`
  width: 38rem;
  background-color: rgba( 0 , 0 , 0, 0.3);
  z-index: 1000;
  opacity: ${(props: any) => props.opacity};
  transition : all 0.5s linear;
  border-radius: 0.2rem;
  box-shadow : 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.4);
  @media (max-width: 768px) {
    width: 35rem;
  }
  @media (max-width: 600px) {
    width: 20rem;
  }
  `;

const ModalContents = ({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const [opacity, setOpacity] = useState(0);

  function toggleModal(e: any) {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 200);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  return (
    <StyledModal
      isOpen={isOpen}
      afterOpen={afterOpen}
      beforeClose={beforeClose}
      onEscapeKeydown={toggleModal}
      backgroundProps={{ opacity }}
      opacity={opacity}
    >
      {children}
    </StyledModal>
  );
};

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props: any) => props.opacity};
  transition: all 0.5s ease-in-out;
`;

const ModalLayout = ({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: any;
}) => {
  return (
    <ModalProvider backgroundComponent={FadingBackground}>
      <ModalContents isOpen={isOpen} setIsOpen={setIsOpen}>
        {children}
      </ModalContents>
    </ModalProvider>
  );
};

export default ModalLayout;
