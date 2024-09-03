import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
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
import { getUserInfo } from "../../fetch/fetch.js";


export const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [activeModal, setActiveModal] = useState(null);
  const menuRef = useRef(null);
  const token = useSelector((state) => state.auth.user.accessToken);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) return;
        const response = await getUserInfo(token);
        setUserData(response.data.data);
      } catch (error) {
        console.error("error1", error);
      }
    };

    fetchUserData();
  }, [token]);

  const userName = userData.name || ""
  const userEmail = userData.email || ""
  
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
    setActiveModal(action);
    setIsOpen(false);
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  return (
    <>
      <DropDownContainer ref={menuRef}>
        <DropDownBtn onClick={toggleMenu}>
          <UserName>{userName || "User"}</UserName>
          <UserAvatar
            src={userData.photo || "/path/to/default-avatar.png"}
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
      {activeModal === "setting" && <SettingModal
        isOpen={true}
        onClose={handleModalClose}
        userData={{
          photo: "userAvatar",
          name: userName,
          email: userEmail,
          gender: userData.gender || "male",
        }}
        onSave={(data) => console.log("Saved data:", data)}
         />}
      {activeModal === "logout" && <UserLogoutModal isOpen={true} onClose={handleModalClose} />}
    </>
  );
};