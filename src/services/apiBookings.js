// import { PAGE_SIZE } from "../utils/constants";
import { baseUrl } from "./apiGuest";
const accessToken = localStorage.getItem("accessToken");
export async function getBookings({ filter, page, search, guestId }) {
  const response = await fetch(
    `${baseUrl}/bookings?page=${page}&filter=${filter}&guestId=${guestId}&search=${search}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
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
export async function updateBookingApi({ value, bookingId }) {
  const response = await fetch(`${baseUrl}/bookings/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
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
  const response = await fetch(
    `${baseUrl}/bookings/afterDate?startDate=${date}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }
      return res.json();
    })
    .catch((err) => console.log(err));
  return response.data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const response = await fetch(`${baseUrl}/bookings/todayActivity`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch today activity");
      }
      return res.json();
    })
    .catch((err) => console.log(err));
  return response?.data;
}

export async function checkoutApi(id, obj) {
  // console.log(id, obj);
  console.log(id, obj);
  const response = await fetch(`${baseUrl}/bookings/checkout/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
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
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
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
      Authorization: `Bearer ${accessToken}`,
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
