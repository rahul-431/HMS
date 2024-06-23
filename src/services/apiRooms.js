const baseUrl = import.meta.env.VITE_BASE_URL;
const accessToken = localStorage.getItem("accessToken");
export async function getRooms(isBooking = false) {
  const response = await fetch(`${baseUrl}/rooms/${isBooking}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch rooms");
      return res.json();
    })
    .catch((error) => console.log(error));
  return response.data;
}
export async function deleteRoom(id) {
  const response = await fetch(`${baseUrl}/rooms/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete room");
      }
      return res.json();
    })
    .catch((error) => console.log(error));
  return response;
}
export async function createRoom(newCabin) {
  const response = await fetch(`${baseUrl}/rooms`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: newCabin,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add new room");
      }
      return res.json();
    })
    .catch((error) => console.log(error));
  if (response.status === 409) return { code: "409" };
  return response.data;
}
export async function createRoomType({ name }) {
  const response = await fetch(`${baseUrl}/rooms/type`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to create room type");
      }
      return res.json();
    })
    .catch((error) => {
      console.log("Error while creating new user :", error);
    });
  return response.data;
}
export async function getRoomTypes() {
  const response = await fetch(`${baseUrl}/rooms/type`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch the room Types");
      return res.json();
    })
    .catch((error) => {
      console.log("Error while fetching room types", error);
    });
  return response.data;
}
export async function deleteRoomType(id) {
  const response = await fetch(`${baseUrl}/rooms/type/${id}`, {
    method: "Delete",
    headers: {
      "Content-Type": "applicaton/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to delete room type");
      return res.json();
    })
    .catch((error) => console.log(error));
  return response;
}
export async function updateRoom({ newRoom, id }) {
  console.log(newRoom, id);
  const response = await fetch(`${baseUrl}/rooms/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(newRoom),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to edit the Room");
      }
      return res.json();
    })
    .catch((err) => console.log(err));
  return response.data;
}
