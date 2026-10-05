import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("hotel-auth");

      window.dispatchEvent(
        new Event("unauthorized")
      );
    }

    return Promise.reject(error);
  }
);

export const getHotels = async () => {
  const response = await api.get("/hotels");

  return response.data;
};

export const getHotel = async (
  id: number
) => {
  const response = await api.get(
    `/hotels/${id}`
  );

  return response.data;
};

export const getRooms = async (
  hotelId: number
) => {
  const response = await api.get(
    `/rooms?hotelId=${hotelId}`
  );

  return response.data;
};

export const getReservations = async () => {
  const response = await api.get(
    "/reservations"
  );

  return response.data;
};

export const createReservation = async (
  reservation: any
) => {
  const response = await api.post(
    "/reservations",
    reservation
  );

  return response.data;
};

export const updateReservation = async (
  id: number,
  reservation: any
) => {
  const response = await api.patch(
    `/reservations/${id}`,
    reservation
  );

  return response.data;
};

export const deleteReservation = async (
  id: number
) => {
  const response = await api.delete(
    `/reservations/${id}`
  );

  return response.data;
};

export default api;