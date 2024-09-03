import { useEffect, useState } from "react";
import styles from "./SettingModal.module.css";
import defaultAvatar from "../../assets/images/avatar.png";
import validateEmail from "./validateForgotPasswordEmail";
import validatePasswordMatch from "./validatePasswordMatch";
import validateName from "./validateName";
import {
  getUserInfo,
  updateUserInfo,
  updateUserPhoto,
} from "../../fetch/fetch";

function SettingModal({ isOpen, onClose, userData, onSave }) {
  const [formData, setFormData] = useState({
    photo: userData.photo || "",
    gender: userData.gender || "",
    name: userData.name || "",
    email: userData.email || "",
    outdatedPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    outdatedPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const [previewImage, setPreviewImage] = useState(
    userData.photo || defaultAvatar
  );

  const [passwordVisibility, setPasswordVisibility] = useState({
    outdatedPassword: false,
    newPassword: false,
    repeatPassword: false,
  });

  useEffect(() => {
    if (isOpen) {
      async function fetchUserInfo() {
        try {
          const token = document.cookie.split("token=")[1];
          const response = await getUserInfo(token);
          const { data } = response.data;

          if (
            data.photo !== formData.photo ||
            data.gender !== formData.gender ||
            data.name !== formData.name ||
            data.email !== formData.email
          ) {
            setFormData({
              photo: data.photo || "",
              gender: data.gender || "",
              name: data.name || "",
              email: data.email || "",
              outdatedPassword: "",
              newPassword: "",
              repeatPassword: "",
            });
            setPreviewImage(data.photo || defaultAvatar);
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }

      fetchUserInfo();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleEsc = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEsc);

      return () => {
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameError = validateName(formData.name);
    if (nameError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: nameError,
      }));
    }

    const emailError = !validateEmail(formData.email)
      ? "Please enter a valid email address."
      : "";
    if (emailError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: emailError,
      }));
    }

    const outdatedPasswordError = formData.outdatedPassword
      ? ""
      : "Please enter your outdated password.";
    if (outdatedPasswordError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        outdatedPassword: outdatedPasswordError,
      }));
    }

    const passwordError = validatePasswordMatch(
      formData.newPassword,
      formData.repeatPassword
    );
    if (passwordError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: formData.newPassword ? "" : passwordError,
        repeatPassword: formData.repeatPassword ? "" : passwordError,
      }));
    }

    if (nameError || emailError || outdatedPasswordError || passwordError) {
      return;
    }

    try {
      const token = document.cookie.split("token=")[1];

      if (formData.photo && typeof formData.photo === "object") {
        const photoFormData = new FormData();
        photoFormData.append("userPhoto", formData.photo);
        await updateUserPhoto(token, photoFormData);
      }

      const response = await updateUserInfo(token, {
        name: formData.name,
        gender: formData.gender,
        email: formData.email,
        password: formData.newPassword,
      });

      setFormData({
        ...formData,
        ...response.data.data,
      });

      onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      setFormData((prevData) => ({
        ...prevData,
        photo: file,
      }));
    }
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
              <img src={previewImage} alt="User" />
              <input
                type="file"
                onChange={handlePhotoUpload}
                style={{ display: "none" }}
                id="photoUploadInput"
              />
              <label htmlFor="photoUploadInput" className={styles.uploadButton}>
                <svg className={styles.uploadIcon}>
                  <use href="/src/assets/icons.svg#icon-upload" />
                </svg>
                Upload a photo
              </label>
            </div>
          </div>
          <div className={styles.formDesktop}>
            <div className={styles.formGroup}>
              <div className={styles.leftColumn}>
                {/* Левая колонка */}
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
                    className={errors.name ? styles.errorInput : ""}
                  />
                </div>
                {errors.name && (
                  <span className={styles.errorMessage}>{errors.name}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label>E-mail</label>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your E-mail"
                    className={errors.email ? styles.errorInput : ""}
                  />
                </div>
                {errors.email && (
                  <span className={styles.errorMessage}>{errors.email}</span>
                )}
              </div>
            </div>
            <div className={styles.rightColumn}></div>
            <div className={styles.formGroup}>
              <label>Password</label>
              <div className={styles.passwordName}>
                <label>Outdated password:</label>
              </div>

              <div className={styles.passwordGroup}>
                <input
                  type={
                    passwordVisibility.outdatedPassword ? "text" : "password"
                  }
                  name="outdatedPassword"
                  value={formData.outdatedPassword}
                  onChange={handleChange}
                  placeholder="Password"
                  className={errors.outdatedPassword ? styles.errorInput : ""}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => togglePasswordVisibility("outdatedPassword")}
                  aria-label="Toggle password visibility"
                >
                  <svg className={styles.icon}>
                    <use
                      href={`/src/assets/icons.svg#icon-${
                        passwordVisibility.outdatedPassword
                          ? "eye-slash"
                          : "eye"
                      }`}
                    />
                  </svg>
                </button>
              </div>
              {errors.outdatedPassword && (
                <span className={styles.errorMessage}>
                  {errors.outdatedPassword}
                </span>
              )}

              <div className={styles.passwordName}>
                <label>New Password:</label>
              </div>
              <div className={styles.passwordGroup}>
                <input
                  type={passwordVisibility.newPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Password"
                  className={errors.newPassword ? styles.errorInput : ""}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => togglePasswordVisibility("newPassword")}
                  aria-label="Toggle password visibility"
                >
                  <svg className={styles.icon}>
                    <use
                      href={`/src/assets/icons.svg#icon-${
                        passwordVisibility.newPassword ? "eye-slash" : "eye"
                      }`}
                    />
                  </svg>
                </button>
              </div>
              {errors.newPassword && (
                <span className={styles.errorMessage}>
                  {errors.newPassword}
                </span>
              )}

              <div className={styles.passwordName}>
                <label>Repeat new password:</label>
              </div>
              <div className={styles.passwordGroup}>
                <input
                  type={passwordVisibility.repeatPassword ? "text" : "password"}
                  name="repeatPassword"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  placeholder="Password"
                  className={errors.repeatPassword ? styles.errorInput : ""}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => togglePasswordVisibility("repeatPassword")}
                  aria-label="Toggle password visibility"
                >
                  <svg className={styles.icon}>
                    <use
                      href={`/src/assets/icons.svg#icon-${
                        passwordVisibility.repeatPassword ? "eye-slash" : "eye"
                      }`}
                    />
                  </svg>
                </button>
              </div>
              {errors.repeatPassword && (
                <span className={styles.errorMessage}>
                  {errors.repeatPassword}
                </span>
              )}
            </div>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default SettingModal;
