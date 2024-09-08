import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./SettingModal.module.css";
import icons from "../../assets/icons.svg";
import { CreateAvatar } from "../DropDownMenu/DropDownMenu.styled.js";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserEmail,
  selectUserGender,
  selectUserName,
  selectUserPhoto,
} from "../../redux/user/selectors.js";
import { patchUserInfo, patchUserPhoto } from "../../redux/user/operations.js";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  outdatedPassword: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .nullable(),

  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .when("outdatedPassword", {
      is: (outdatedPassword) => !!outdatedPassword,
      then: (schema) =>
        schema
          .required("New password is required")
          .notOneOf(
            [Yup.ref("outdatedPassword")],
            "New password cannot be the same as the old password"
          ),
    }),

  repeatPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .when("newPassword", {
      is: (newPassword) => !!newPassword,
      then: (schema) => schema.required("Repeat password is required"),
    }),
});

function SettingModal({ isOpen, onClose, onSave }) {
  const dispatch = useDispatch();
  const userPhoto = useSelector(selectUserPhoto);
  const userGender = useSelector(selectUserGender);
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);

  const [passwordVisibility, setPasswordVisibility] = useState({
    outdatedPassword: false,
    newPassword: false,
    repeatPassword: false,
  });

  const [previewPhoto, setPreviewPhoto] = useState(userPhoto);

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

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  };

  const handlePhotoUpload = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("photo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
      };
      reader.readAsDataURL(file);

      dispatch(patchUserPhoto(file));
    }
  };

  if (!isOpen) return null;

  const initial = userName?.charAt(0).toUpperCase() || "";

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    const updatedData = {};

    if (values.name && values.name !== userName) {
      updatedData.name = values.name;
    }

    if (values.gender && values.gender !== userGender) {
      updatedData.gender = values.gender;
    }

    if (values.email && values.email !== userEmail) {
      updatedData.email = values.email;
    }

    if (values.newPassword) {
      updatedData.password = values.newPassword;
    }

    try {
      if (values.photo && typeof values.photo === "object") {
        const photoFormData = new FormData();
        photoFormData.append("userPhoto", values.photo);

        const photoResponse = await dispatch(
          patchUserPhoto(photoFormData)
        ).unwrap();
        updatedData.photo = photoResponse.photoUrl;
      }

      if (Object.keys(updatedData).length > 0) {
        await dispatch(patchUserInfo(updatedData)).unwrap();
      }

      onSave(updatedData);
      onClose();
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data?.message;

        if (
          error.response.status === 401 &&
          errorMessage === "Access token expired"
        ) {
          localStorage.clear();
          window.location.href = "/";
        }

        if (
          errorMessage === "New password cannot be the same as the old password"
        ) {
          setFieldError("newPassword", errorMessage);
        }
      } else {
        console.error("Error updating user info:", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Setting</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <svg className={styles.icon}>
              <use href={`${icons}#icon-x-close`} />
            </svg>
          </button>
        </div>

        <Formik
          initialValues={{
            photo: "",
            gender: userGender || "",
            name: userName || "",
            email: userEmail || "",
            outdatedPassword: "",
            newPassword: "",
            repeatPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, handleBlur, setFieldValue }) => (
            <Form>
              <div className={styles.formGroup}>
                <label htmlFor="photoUploadInput">Your photo</label>
                <div className={styles.photoUpload}>
                  {previewPhoto ? (
                    <img src={previewPhoto} alt="User photo" />
                  ) : userPhoto ? (
                    <img src={userPhoto} alt="User photo" />
                  ) : (
                    <CreateAvatar className="avatar-large">
                      {initial}
                    </CreateAvatar>
                  )}
                  <input
                    type="file"
                    onChange={(event) =>
                      handlePhotoUpload(event, setFieldValue)
                    }
                    style={{ display: "none" }}
                    id="photoUploadInput"
                    aria-label="Upload a photo"
                  />
                  <label
                    htmlFor="photoUploadInput"
                    className={styles.uploadButton}
                  >
                    <svg className={styles.uploadIcon}>
                      <use href={`${icons}#icon-upload`} />
                    </svg>
                    Upload a photo
                  </label>
                </div>
              </div>

              <div className={styles.formDesktop}>
                <div className={styles.leftColumn}>
                  <div className={styles.formGroup}>
                    <label>Your gender identity</label>
                    <div className={styles.radioGroup}>
                      <label>
                        <Field type="radio" name="gender" value="female" />
                        Woman
                      </label>
                      <label>
                        <Field type="radio" name="gender" value="male" />
                        Man
                      </label>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Your name</label>
                    <Field name="name">
                      {({ field, form }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Your name"
                          className={`${styles.inputGroup} ${
                            form.errors.name && form.touched.name
                              ? styles.errorInput
                              : ""
                          }`}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>E-mail</label>
                    <Field name="email">
                      {({ field, form }) => (
                        <input
                          {...field}
                          type="email"
                          placeholder="Your E-mail"
                          className={`${styles.inputGroup} ${
                            form.errors.email && form.touched.email
                              ? styles.errorInput
                              : ""
                          }`}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>
                </div>
                <div className={styles.rightColumn}>
                  <div className={styles.formGroup}>
                    <label>Password</label>

                    <div className={styles.passwordName}>
                      <label>Outdated password:</label>
                    </div>

                    <div className={styles.passwordGroup}>
                      <Field name="outdatedPassword">
                        {({ field }) => (
                          <input
                            {...field}
                            type={
                              passwordVisibility.outdatedPassword
                                ? "text"
                                : "password"
                            }
                            placeholder="Password"
                            onBlur={handleBlur}
                            className={
                              errors.outdatedPassword &&
                              touched.outdatedPassword
                                ? styles.errorInput
                                : ""
                            }
                          />
                        )}
                      </Field>
                      <button
                        type="button"
                        className={styles.togglePassword}
                        onClick={() =>
                          togglePasswordVisibility("outdatedPassword")
                        }
                        aria-label="Toggle outdated password visibility"
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
                    <ErrorMessage
                      name="outdatedPassword"
                      component="div"
                      className={styles.errorMessage}
                    />

                    <div className={styles.passwordName}>
                      <label>New Password:</label>
                    </div>

                    <div className={styles.passwordGroup}>
                      <Field name="newPassword">
                        {({ field }) => (
                          <input
                            {...field}
                            type={
                              passwordVisibility.newPassword
                                ? "text"
                                : "password"
                            }
                            placeholder="Password"
                            onBlur={handleBlur}
                            className={
                              errors.newPassword && touched.newPassword
                                ? styles.errorInput
                                : ""
                            }
                          />
                        )}
                      </Field>
                      <button
                        type="button"
                        className={styles.togglePassword}
                        onClick={() => togglePasswordVisibility("newPassword")}
                        aria-label="Toggle new password visibility"
                      >
                        <svg className={styles.icon}>
                          <use
                            href={`${icons}#icon-${
                              passwordVisibility.newPassword
                                ? "eye"
                                : "eye-slash"
                            }`}
                          />
                        </svg>
                      </button>
                    </div>
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className={styles.errorMessage}
                    />
                    <div className={styles.passwordName}>
                      <label>Repeat new password:</label>
                    </div>

                    <div className={styles.passwordGroup}>
                      <Field name="repeatPassword">
                        {({ field }) => (
                          <input
                            {...field}
                            type={
                              passwordVisibility.repeatPassword
                                ? "text"
                                : "password"
                            }
                            placeholder="Password"
                            onBlur={handleBlur}
                            className={
                              errors.repeatPassword && touched.repeatPassword
                                ? styles.errorInput
                                : ""
                            }
                          />
                        )}
                      </Field>
                      <button
                        type="button"
                        className={styles.togglePassword}
                        onClick={() =>
                          togglePasswordVisibility("repeatPassword")
                        }
                        aria-label="Toggle repeat new password visibility"
                      >
                        <svg className={styles.icon}>
                          <use
                            href={`${icons}#icon-${
                              passwordVisibility.repeatPassword
                                ? "eye"
                                : "eye-slash"
                            }`}
                          />
                        </svg>
                      </button>
                    </div>
                    <ErrorMessage
                      name="repeatPassword"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.formButton}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SettingModal;
