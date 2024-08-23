const nickNameRegex = /^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$/;
const phoneNumber = /^\d{9,20}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,20}$/;

const emailRegex =
  /^(?=.{1,100}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;

export const validateNickname = (nickname) => nickNameRegex.test(nickname);
export const validatePhoneNumber = (phone) => phoneNumber.test(phone);
export const validateEmail = (email) => emailRegex.test(email);
export const validatePassword = (password) => passwordRegex.test(password);
