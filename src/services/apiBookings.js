// import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import { baseUrl } from "./apiGuest";
import supabase from "./supabase";

export async function getBookings({ filter, page, search, guestId }) {
  const response = await fetch(
    `${baseUrl}/bookings?page=${page}&filter=${filter}&guestId=${guestId}&search=${search}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch the booking");
      }
      return res.json();
    })
    .catch((err) => console.log(err));

  return response.data;
}
export async function getBooking(id) {
  const response = await fetch(`${baseUrl}/bookings/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch the booking");
      }
      return res.json();
    })
    .catch((err) => console.log(err));

  return response.data;
}
export async function updateBookingApi({ value, bookingId }) {
  const response = await fetch(`${baseUrl}/bookings/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update extra price");
      }
      return res.json();
    })
    .catch((err) => console.log(err));
  return response.data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function checkoutApi(id, obj) {
  // console.log(id, obj);
  console.log(id, obj);
  const response = await fetch(`${baseUrl}/bookings/checkout/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to confirm payment");
      }
      return res.json();
    })
    .catch((err) => console.log(err));
  return response.data;
}

export async function deleteBooking(id) {
  const response = await fetch(`${baseUrl}/bookings/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete booking");
      }
      return res?.json();
    })
    .catch((err) => console.log(err));
  return response;
}
export async function addBooking(newBooking) {
  const response = await fetch(`${baseUrl}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBooking),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add new Booking");
      }
      return res.json();
    })
    .catch((err) => console.log(err));
  return response.data;
}
