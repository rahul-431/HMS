const baseUrl = import.meta.env.VITE_BASE_URL;
export async function getRooms(isBooking = false) {
  const response = await fetch(`${baseUrl}/rooms/${isBooking}`)
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
  const response = await fetch(`${baseUrl}/rooms/type`)
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
