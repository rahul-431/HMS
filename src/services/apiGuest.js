const baseUrl = import.meta.env.VITE_BASE_URL;
export async function getGuests({ filter, page, search }) {
  const response = await fetch(
    `${baseUrl}/guests?page=${page}&filter=${filter}&search=${search}`
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
  const response = await fetch(`${baseUrl}/guests/${id}`)
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