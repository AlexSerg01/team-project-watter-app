import React, { useState } from "react";
import styles from "./SettingModal.module.css";
import defaultAvatar from "../../assets/nonAvatarWhite.svg";

const SettingModal = ({ isOpen, onClose, userData, onSave }) => {
  const [formData, setFormData] = useState({
    photo: userData.photo || "",
    gender: userData.gender || "",
    name: userData.name || "",
    email: userData.email || "",
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
    onClose(); // Закрыть модальное окно после сохранения данных
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Setting</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg className={styles.icon}>
              <use href="/src/assets/icons.svg#icon-x-close" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Your photo</label>
            <div className={styles.photoUpload}>
              <img src={formData.photo || defaultAvatar} alt="User" />
              <button type="button">
                <svg className={styles.icon}>
                  <use href="/src/assets/icons.svg#icon-upload" />
                </svg>
                Upload a photo
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Your gender identity</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                Woman
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                Man
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Your name</label>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>E-mail</label>
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <div className={styles.passwordName}>
              <label>Outdated password:</label>
            </div>

            <div className={styles.passwordGroup}>
              <input
                type="password"
                name="OutdatedPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Password"
              />
              <svg className={styles.icon}>
                <use href="/src/assets/icons.svg#icon-eye-slash" />
              </svg>
            </div>
            <label>New Password:</label>
            <div className={styles.passwordGroup}>
              <input
                type="password"
                name="NewPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Password"
              />
              <svg className={styles.icon}>
                <use href="/src/assets/icons.svg#icon-eye-slash" />
              </svg>
            </div>
            <label>Repeat new password:</label>
            <div className={styles.passwordGroup}>
              <input
                type="password"
                name="repeatNewPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                placeholder="Password"
              />
              <svg className={styles.icon}>
                <use href="/src/assets/icons.svg#icon-eye-slash" />
              </svg>
            </div>
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default SettingModal;
