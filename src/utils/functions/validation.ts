import { ChangeEvent } from "react";

export const passwordValidation = (
  e: ChangeEvent<HTMLInputElement>,
  setPasswordErr: (value: string) => void,
  setPasswordSuccess: (value: boolean) => void
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
    setPasswordSuccess(false);
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
    setPasswordSuccess(false);
  } else {
    setPasswordSuccess(true);
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
    console.log(password, repeatPassword, 1);
    setPasswordErr("Please repeat your password");
    setPasswordSuccess(false);
  } else if (repeatPassword !== password) {
    console.log(password, repeatPassword, 2);
    setPasswordErr("Password mismatch");
    setPasswordSuccess(false);
  } else {
    console.log(password, repeatPassword, 3);
    setPasswordSuccess(true);
    setPasswordErr("");
  }
};
