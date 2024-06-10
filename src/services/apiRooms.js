import supabase, { supabaseUrl } from "./supabase";
const baseUrl = import.meta.env.VITE_BASE_URL;
export async function getRooms() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Rooms could not be loaded");
  }
  return data;
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
  console.log("image Name:", newCabin.image);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/room_images/${imageName}`;
  // https://vuermdkdtcqyicfvebaq.supabase.co/storage/v1/object/public/room_images/cabin-001.jpg?t=2024-04-01T12%3A09%3A39.984Z
  //1. create new cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.log(error);
    throw new Error("Could not create a new cabin");
  }
  if (hasImagePath) return data;
  //2. uploading an image
  const { error: storageError } = await supabase.storage
    .from("room_images")
    .upload(imageName, newCabin.image);

  // 3. delete the room if ther waw an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Room image could not be uploaded and room is not created");
  }
  return data;
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
