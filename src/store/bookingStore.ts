import { create } from "zustand";
import type { Hotel, Room } from "../types/hotel";

interface BookingStore {
  selectedHotel: Hotel | null;
  selectedRoom: Room | null;

  checkIn: string;
  checkOut: string;
  guests: number;

  selectHotel: (hotel: Hotel) => void;
  selectRoom: (room: Room) => void;

  updateDates: (
    checkIn: string,
    checkOut: string
  ) => void;

  updateGuests: (guests: number) => void;

  clearBooking: () => void;

  getStayDuration: () => number;
  getRoomCost: () => number;
  getTax: () => number;
  getTotal: () => number;
}

export const useBookingStore = create<BookingStore>(
  (set, get) => ({
    selectedHotel: null,
    selectedRoom: null,

    checkIn: "",
    checkOut: "",

    guests: 1,

    selectHotel: (hotel) => {
      set({
        selectedHotel: hotel,
        selectedRoom: null
      });
    },

    selectRoom: (room) => {
      set({
        selectedRoom: room
      });
    },

    updateDates: (checkIn, checkOut) => {
      set({
        checkIn,
        checkOut
      });
    },

    updateGuests: (guests) => {
      set({
        guests: Math.max(1, guests)
      });
    },

    clearBooking: () => {
      set({
        selectedHotel: null,
        selectedRoom: null,
        checkIn: "",
        checkOut: "",
        guests: 1
      });
    },

    getStayDuration: () => {
      const { checkIn, checkOut } = get();

      if (!checkIn || !checkOut) {
        return 0;
      }

      const start = new Date(checkIn);
      const end = new Date(checkOut);

      const difference =
        end.getTime() - start.getTime();

      const nights = Math.ceil(
        difference / (1000 * 60 * 60 * 24)
      );

      return nights > 0 ? nights : 0;
    },

    getRoomCost: () => {
      const room = get().selectedRoom;

      if (!room) {
        return 0;
      }

      return (
        room.price *
        get().getStayDuration()
      );
    },

    getTax: () => {
      return get().getRoomCost() * 0.12;
    },

    getTotal: () => {
      return (
        get().getRoomCost() +
        get().getTax()
      );
    }
  })
);