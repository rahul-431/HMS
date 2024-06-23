import supabase, { supabaseUrl } from "./supabase";
const baseUrl = import.meta.env.VITE_BASE_URL;
const accessToken = localStorage.getItem("accessToken");
export async function login({ email, password }) {
  const response = await fetch(`${baseUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("network response was not okay");
      }
      return res.json();
    })
    .catch((error) => console.log("Error while registering new user ", error));
  return response.data;
}
export async function getCurrentUser() {
  const response = await fetch(`${baseUrl}/users/getCurrent`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("network response was not okay");
      }
      return res.json();
    })
    .catch((error) => console.log("Failed to get current user", error));
  return response.data;
}
export async function logout() {
  const response = await fetch(`${baseUrl}/users/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("network response was not okay");
      }
      return res.json();
    })
    .catch((error) => console.log("Failed to logout user", error));
  return response;
}
export async function signUp({ email, password, fullName }) {
  const response = await fetch(`${baseUrl}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      email,
      password,
      fullName,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("network response was not okay");
      }
      return res.json();
    })
    .catch((error) => console.log("Error while registering new user ", error));
  return response.data;
}
export async function updateCurrentUser({ fullName, avatar, password }) {
  //1. Update fullname or password
  let updateData;
  if (password) updateData = JSON.stringify({ password });
  const formData = new FormData();

  if (fullName && avatar) {
    formData.append("fullName", fullName);
    formData.append("avatar", avatar);
    updateData = formData;
  }
  if (fullName) updateData = JSON.stringify({ fullName });

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    throw new Error(error.message);
  }
  if (!avatar) return data;

  //2. update an avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  //3. update avatar in the user
  const { data: updatedUserAvatar, error: updateUserAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updateUserAvatarError) throw new Error(updateUserAvatarError.message);
  return updatedUserAvatar;
}
export async function getUsers() {
  const response = await fetch(`${baseUrl}/users/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      return res.json();
    })
    .catch((error) => console.log("Error while fething users", error));
  console.log(response);
  return response;
}
export async function deleteUser(id) {
  console.log(id);
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete user");
      }
      return res.json();
    })
    .catch((error) => console.log(error));
  return response;
}
