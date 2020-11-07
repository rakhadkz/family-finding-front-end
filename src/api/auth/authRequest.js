import { request } from "../../utils/request";

export const loginRequest = async ({ email, password }) => {
  return request({
    endpoint: "login",
    data: { user: { email, password } },
    method: "POST",
  });
};

export const signupRequest = async (user) => {
  const userBody = {
    email: user.email,
    password: user.password,
    password_confirmation: user.password_confirmation,
    first_name: user.first_name,
    last_name: user.last_name,
  };
  return request({
    endpoint: "signup",
    data: { user: userBody },
    method: "POST",
  });
};

export const fetchMeRequest = async () => {
  return request({
    endpoint: "users/me",
    method: "GET",
  });
};
