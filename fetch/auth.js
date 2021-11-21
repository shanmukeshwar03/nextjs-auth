const BASE = "https://auth.shanmukeshwar.me/";

export const login = async (payload) => {
  const response = await fetch(BASE + "login", {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify(payload),
    credentials: "include",
  }).then(async (res) => {
    if (res.ok) return { success: true };
    else return { failed: await res.text() };
  });

  return response;
};

export const register = async (payload) => {
  const response = await fetch(BASE + "register", {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify(payload),
    credentials: "include",
  }).then(async (res) => {
    if (res.ok) return { success: true };
    else return { failed: await res.text() };
  });

  return response;
};

export const forgotpassword = async (payload) => {
  const response = await fetch(BASE + "forgotpassword", {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify(payload),
    credentials: "include",
  }).then(async (res) => {
    if (res.ok) return { success: true };
    else return { failed: await res.text() };
  });

  return response;
};

export const resetpassword = async (payload, token) => {
  const response = await fetch(BASE + "resetpassword/" + token, {
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
    body: JSON.stringify(payload),
    credentials: "include",
  }).then(async (res) => {
    if (res.ok) return { success: true };
    else return { failed: await res.text() };
  });

  return response;
};
