import { useEffect } from "react";
import { 
  ModalBackdrop, 
  ModalContent, 
  ModalHeader, 
  TitleModal, 
  ModalCloseBtn, 
  ModalText,
  ContainerLogoutBtn,
  StyledButton
 } from "./UserLogoutModal.styled.js"
import icons from "../../assets/icons.svg"

export const UserLogoutModal = ({isOpen, onClose}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return(
    <ModalBackdrop onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <TitleModal>Log out</TitleModal>
          <ModalCloseBtn onClick={handleClose}>
            <svg width="24" height="24">
              <use href={`${icons}#icon-cross`} />
            </svg>
          </ModalCloseBtn>
        </ModalHeader>
        <ModalText>Do you really want to leave?</ModalText>
        <ContainerLogoutBtn>
            <StyledButton className="logout-button">Log out</StyledButton>
            <StyledButton className="cancel-button" onClick={onClose}>Cancel</StyledButton>
        </ContainerLogoutBtn>
      </ModalContent>
    </ModalBackdrop>
  )
}