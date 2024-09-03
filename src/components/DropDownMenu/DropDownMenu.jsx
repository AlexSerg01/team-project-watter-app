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
// import { UserLogoutModal } from "../UserLogoutModal/UserLogoutModal.jsx";
import { getUserInfo } from "../../fetch/fetch.js";


export const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const menuRef = useRef(null);
  const token = useSelector((state) => state.auth.user.accessToken);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) return;
        const response = await getUserInfo(token);
        setUserData(response.data);
      } catch (error) {
        console.error("error1", error);
      }
    };

    fetchUserData();
  }, [token]);

  const userName = userData.name 
console.log(userName)
  
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
      // Додати логіку для вихіда из аккаунта
    }
    console.log(action);
    setIsOpen(false);
  };

  return (
    <DropDownContainer ref={menuRef}>
      <DropDownBtn onClick={toggleMenu}>
        <UserName>{userData.name || "User"}</UserName>
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
      <SettingModal
        isOpen={isSettingModalOpen}
        onClose={() => setIsSettingModalOpen(false)}
        userData={{
          photo: "userAvatar",
          name: "userName",
          email: userData.email,
          gender: "male",
        }}
        onSave={(data) => console.log("Saved data:", data)}
      />
    </DropDownContainer>
  );
};
