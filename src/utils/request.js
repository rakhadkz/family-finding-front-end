import { getToken } from "../context/auth/authProvider";

//export const authURL = "https://family-finding-api.herokuapp.com/api/v1";
export const authURL = "http://localhost:3000/api/v1";

export const request = async ({ endpoint, data, method, meta = false }) => {
  const token = await getToken();

  const config = {
    method,
    body: data ? JSON.stringify(data) : null,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : null,
    },
  };

  return window
    .fetch(`${authURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.ok) {
        const res = await response.json();
        const data = meta ? res : res.data;
        console.log(`Response data from ${endpoint}`, data);
        return data;
      } else {
        return Promise.reject(response);
      }
    });
};
