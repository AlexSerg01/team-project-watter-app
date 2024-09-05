import { useEffect, useState } from "react";
import styles from "./SettingModal.module.css";
import defaultAvatar from "../../assets/images/avatar.png";
import icons from "../../assets/icons.svg";
import {
  validateName,
  validateEmail,
  validatePasswordField,
  validatePasswordMatch,
} from "./validate";
import {
  getUserInfo,
  updateUserInfo,
  updateUserPhoto,
} from "../../fetch/fetch";

function SettingModal({ isOpen, onClose, userData, onSave }) {
  const [formData, setFormData] = useState({
    photo: userData?.photo || "",
    gender: userData?.gender || "",
    name: userData?.name || "",
    email: userData?.email || "",
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
    userData?.photo || defaultAvatar
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
          const response = await getUserInfo();
          const { data } = response.data;

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

    let nameError = "";
    let emailError = "";
    let outdatedPasswordError = "";
    let newPasswordError = "";
    let repeatPasswordError = "";

    if (formData.name) {
      nameError = validateName(formData.name);
    }

    if (formData.email) {
      emailError = !validateEmail(formData.email)
        ? "Please enter a valid email address."
        : "";
    }

    const isPasswordFilled =
      formData.outdatedPassword ||
      formData.newPassword ||
      formData.repeatPassword;

    outdatedPasswordError = validatePasswordField(
      formData.outdatedPassword,
      "Outdated password",
      isPasswordFilled
    );
    newPasswordError = validatePasswordField(
      formData.newPassword,
      "New password",
      isPasswordFilled
    );
    repeatPasswordError = validatePasswordField(
      formData.repeatPassword,
      "Repeat new password",
      isPasswordFilled
    );

    if (isPasswordFilled) {
      const passwordMatchError = validatePasswordMatch(
        formData.newPassword,
        formData.repeatPassword
      );
      if (passwordMatchError) {
        newPasswordError = passwordMatchError;
        repeatPasswordError = passwordMatchError;
      }
    }

    setErrors({
      name: nameError,
      email: emailError,
      outdatedPassword: outdatedPasswordError,
      newPassword: newPasswordError,
      repeatPassword: repeatPasswordError,
    });

    if (
      nameError ||
      emailError ||
      outdatedPasswordError ||
      newPasswordError ||
      repeatPasswordError
    ) {
      return;
    }

    const updatedData = {};
    if (formData.name && formData.name !== userData.name)
      updatedData.name = formData.name;
    if (formData.gender && formData.gender !== userData.gender)
      updatedData.gender = formData.gender;
    if (formData.email && userData && formData.email !== userData.email)
      updatedData.email = formData.email;
    if (formData.newPassword) updatedData.password = formData.newPassword;

    try {
      if (formData.photo && typeof formData.photo === "object") {
        const photoFormData = new FormData();
        photoFormData.append("userPhoto", formData.photo);
        const photoResponse = await updateUserPhoto(photoFormData);
        updatedData.photo = photoResponse.data.data.photourl;
        setPreviewImage(photoResponse.data.data.photourl);
      }

      if (Object.keys(updatedData).length > 0) {
        const response = await updateUserInfo(updatedData);
        setFormData({
          ...formData,
          ...response.data.data,
        });

        onSave(response.data.data);
      }

      onClose();
    } catch (error) {
      if (
        error.response &&
        error.response.data.message ===
          "New password cannot be the same as the old password"
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          newPassword: "New password cannot be the same as the old password",
        }));
      } else {
        console.error("Error updating user info:", error);
      }
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
              <use href={`${icons}#icon-x-close`} />
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
                  <use href={`${icons}#icon-upload`} />
                </svg>
                Upload a photo
              </label>
            </div>
          </div>
          <div className={styles.formDesktop}>
            <div className={styles.formGroup}>
              <div className={styles.leftColumn}>
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
                      href={`${icons}#icon-${
                        passwordVisibility.outdatedPassword
                          ? "eye"
                          : "eye-slash"
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
                      href={`${icons}#icon-${
                        passwordVisibility.newPassword ? "eye" : "eye-slash"
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
                      href={`${icons}#icon-${
                        passwordVisibility.repeatPassword ? "eye" : "eye-slash"
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
