import { useState, useEffect, useRef } from "react";
import avatar from "../../assets/images/avatar.png";
import {
  DropDownContainer,
  DropDownBtn,
  UserName,
  UserAvatar,
  ChevronIcon,
  Menu,
  MenuItem,
} from "./DropDownMenu.styled";
import icons from "../../assets/icons.svg";
import SettingModal from "../SettingModal/SettingModal";
import { UserLogoutModal } from "../UserLogoutModal/UserLogoutModal.jsx";
import { getUserInfo } from "../../fetch/fetch";
import { createPortal } from "react-dom";

export const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [userInfo, setUserData] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserInfo();
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleMenuItemClick = (action) => {
    if (action === "setting") {
      setIsSettingModalOpen(true);
    } else if (action === "logout") {
      setIsLogoutModalOpen(true);
    }
    setIsOpen(false);
  };

  const handleSave = (updatedData) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      ...updatedData,
    }));
  };

  return (
    <>
      <DropDownContainer ref={menuRef}>
        <DropDownBtn onClick={toggleMenu}>
          <UserName>{userInfo?.name || "User"}</UserName>
          <UserAvatar
            src={userInfo?.photo || avatar}
            alt="User`s Avatar"
            width="28"
            height="28"
          ></UserAvatar>
          <ChevronIcon>
            <use href={`${icons}#icon-chevron-down`} />
          </ChevronIcon>
        </DropDownBtn>
        {isOpen && (
          <Menu>
            <MenuItem onClick={() => handleMenuItemClick("setting")}>
              <svg width="16" height="16">
                <use href={`${icons}#icon-setting`} />
              </svg>
              Setting
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("logout")}>
              <svg width="16" height="16">
                <use href={`${icons}#icon-logout`} />
              </svg>
              Log out
            </MenuItem>
          </Menu>
        )}
      </DropDownContainer>

      {createPortal(
        <SettingModal
          isOpen={isSettingModalOpen}
          onClose={() => setIsSettingModalOpen(false)}
          userData={userInfo}
          onSave={handleSave}
        />,
        document.body
      )}

      {createPortal(
        <UserLogoutModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
        />,
        document.body
      )}
    </>
  );
};
