import { ChangeEvent } from "react";
import { ErrorTypes } from "../../components/feature/userInputs/types";

export const passwordValidation = (
  e: ChangeEvent<HTMLInputElement>,
  setPasswordErr: (value: string) => void
): void => {
  const passwordInputValue = e.target.value.trim();

  const uppercaseRegExp = /(?=.*?[A-Z])/;
  const lowercaseRegExp = /(?=.*?[a-z])/;
  const digitsRegExp = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\"])/;
  const minLengthRegExp = /.{8,}/;
  const passwordLength = passwordInputValue.length;
  const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
  const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
  const digitsPassword = digitsRegExp.test(passwordInputValue);
  const specialCharPassword = specialCharRegExp.test(passwordInputValue);
  const minLengthPassword = minLengthRegExp.test(passwordInputValue);

  const passwordCheck = () => {
    return (
      !minLengthPassword ||
      !uppercasePassword ||
      !lowercasePassword ||
      !digitsPassword ||
      !specialCharPassword
    );
  };

  if (passwordLength === 0) {
    setPasswordErr("Password is required.");
  } else if (passwordCheck()) {
    const passwordErrors = [
      !minLengthPassword && "8 characters",
      !uppercasePassword && "one uppercase letter",
      !lowercasePassword && "one lowercase letter",
      !digitsPassword && "one digit",
      !specialCharPassword && "one special character",
    ].filter(Boolean);

    if (passwordErrors.length > 0) {
      setPasswordErr(
        `The password must have at least ${passwordErrors.join(", ")}.`
      );
    } else {
      setPasswordErr("");
    }
  } else {
    setPasswordErr("");
  }
};

export const repeatPasswordValidation = (
  password: string,
  repeatPassword: string,
  setPasswordErr: (value: string) => void,
  setPasswordSuccess: (value: boolean) => void
) => {
  if (repeatPassword.length === 0) {
    setPasswordErr("Please repeat your password");
    setPasswordSuccess(false);
  } else if (repeatPassword !== password) {
    setPasswordErr("Password mismatch");
    setPasswordSuccess(false);
  } else {
    setPasswordSuccess(true);
    setPasswordErr("");
  }
};

export const isValidEmail = (
  email: string,
  setEmailError: (value: string) => void
) => {
  if (!email) {
    setEmailError("Email is required.");
  } else {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(email)) {
      setEmailError("");
    } else {
      setEmailError("Email is not a valid");
    }
  }
};

export const ageValidation = (
  age: string,
  setAgeError: (error: ErrorTypes) => void
) => {
  if (!age) {
    setAgeError({ message: "The Age can't be empty", success: false });
  } else if (+age < 0) {
    setAgeError({ message: "Age cannot be negative.", success: false });
  } else {
    setAgeError({ message: "", success: true });
  }
};

export const nameValidation = (
  name: string,
  setNameError: (error: ErrorTypes) => void,
  type: string
) => {
  const isNameValid = /^[A-Za-z\s]+$/.test(name);
  if (name === "") {
    setNameError({
      success: false,
      message: `The ${type} can't be empty`,
    });
  } else if (!isNameValid) {
    setNameError({
      success: false,
      message: `${type} should contain only letters`,
    });
  } else {
    setNameError({
      success: true,
      message: "",
    });
  }
};
