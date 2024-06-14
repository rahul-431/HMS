import supabase from "./supabase";
const baseUrl = import.meta.env.VITE_BASE_URL;
export async function getRooms() {
  const response = await fetch(`${baseUrl}/rooms`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch rooms");
      return res.json();
    })
    .catch((error) => console.log(error));
  return response.data;
}
export async function deleteRoom(id) {
  console.log("deleting this id of room", id);
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Failed to delete the room");
  }
  return data;
}
export async function createRoom(newCabin) {
  console.log(newCabin);
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
export async function updateRoom(editCabin) {
  // console.log(newCabin, id);
  const { newCabin, editId } = editCabin;
  const { data, error } = await supabase
    .from("cabins")
    .update(newCabin)
    .eq("id", editId)
    .select();
  if (error) {
    console.log(error);
    throw new Error("Could not update room data");
  }
  return data;
}
