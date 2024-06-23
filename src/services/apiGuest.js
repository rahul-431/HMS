export const baseUrl = import.meta.env.VITE_BASE_URL;
const accessToken = localStorage.getItem("accessToken");
export async function getGuests({ filter, page, search }) {
  const response = await fetch(
    `${baseUrl}/guests?page=${page}&filter=${filter}&search=${search}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch guest list");
      }
      return res.json();
    })
    .catch((err) => console.log(err));
  const data = response?.data?.list;
  const count = response?.data?.count;
  return { data, count };
}
export async function addGuest(guest) {
  const response = await fetch(`${baseUrl}/guests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(guest),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add new guest");
      }
      return res.json();
    })
    .catch((err) => console.log(err));
  return response.data;
}
export async function getGuest(id) {
  const response = await fetch(`${baseUrl}/guests/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch the guest");
      }
      return res.json();
    })
    .catch((err) => console.log(err));

  return response.data;
}
export async function deleteGuestApi(id) {
  const response = await fetch(`${baseUrl}/guests/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "applicaton/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete the guest info");
      }
      return res.json();
    })
    .catch((err) => console.log(err));
  return response;
}
export async function editGuestApi({ newGuest, id }) {
  const response = await fetch(`${baseUrl}/guests/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(newGuest),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to edit the guest");
      }
      return res.json();
    })
    .catch((err) => console.log(err));
  return response.data;
}
export async function searchGuest(query) {
  const response = await fetch(`${baseUrl}/guests/search/${query}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Fetching failed");
      }
      return res.json();
    })
    .catch((err) => console.log(err));
  return response.data;
}
export async function getGuestBooking(id) {
  const response = await fetch(`${baseUrl}/bookings/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch the booking");
      }
      return res.json();
    })
    .catch((err) => console.log(err));

  return response.data;
}
