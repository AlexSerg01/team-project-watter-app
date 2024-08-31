import { useState } from "react";
import avatar from "../../assets/images/avatar.png";
import { DropDownContainer, DropDownBtn, UserName, UserAvatar, ChevronIcon, Menu, MenuItem} from "./DropDownMenu.styled";
import icons from "../../assets/icons.svg";

export const DropDownMenu = () => {
  //все пов'язане з юзером замінити на данні з БД та видалити картинку для аватар
  const userName = 'David';
  const userAvatar = avatar; 

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleMenuItemClick = (action) => {
    console.log(action);
    setIsOpen(false);
  }

  return (
    <DropDownContainer>
      <DropDownBtn onClick={toggleMenu}>
        <UserName>{userName}</UserName>
        <UserAvatar src={userAvatar} alt="User`s Avatar" width="28" height="28" ></UserAvatar>
        <ChevronIcon>
                <use href={`${icons}#icon-chevron-down`} /> 
        </ChevronIcon>
      </DropDownBtn>
      {isOpen && (
        <Menu>
          <MenuItem onClick={() => handleMenuItemClick('setting')}>
            <svg width="16" height="16">
              <use href={`${icons}#icon-setting`} />
            </svg>
            Setting
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('logout')}>
            <svg width="16" height="16">
              <use href={`${icons}#icon-logout`} />
            </svg>
            Log out
          </MenuItem>
        </Menu>
      )}
    </DropDownContainer>
  )
};