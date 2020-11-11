import { request } from "../../utils/request";

export const loginRequest = async ({ email, password }) => {
  return request({
    endpoint: "auth/login",
    data: { user: { email, password } },
    method: "POST",
  });
};

export const signupRequest = async (user) => {
  console.log("body", user);
  const userBody = {
    email: user.email,
    role: user.role.value,
    phone: user.phone,
    organization_id: user.organization_id.value,
    first_name: user.first_name,
    last_name: user.last_name,
  };
  return request({
    endpoint: "auth/signup",
    data: { user: userBody },
    method: "POST",
  });
};

export const fetchMeRequest = async (view = "") => {
  return request({
    endpoint: "users/me?view=" + view,
    method: "GET",
  });
};

export const resetRequest = async (data) => {
  return request({
    endpoint: "auth/forgot_password",
    data: { email: data.email },
    method: "POST",
  });
};

export const newPasswordRequest = async (data) => {
  return request({
    endpoint: "auth/reset_password",
    data: {
      change_password_token: data.token,
      password: data.password,
    },
    method: "POST",
  });
};
