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

export const fetchMeRequest = async () => {
  return request({
    endpoint: "users/me",
    method: "GET",
  });
};
