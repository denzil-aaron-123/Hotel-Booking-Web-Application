export interface Hotel {
  id: number;
  name: string;
  location: string;
  description: string;
  rating: number;
  price: number;
  image: string;
}

export interface Room {
  id: number;
  hotelId: number;
  roomNumber: string;
  type: string;
  price: number;
  available: boolean;
}

export interface User {
  id?: number | string;
  name: string;
  email: string;
}

export interface Reservation {
  id?: number;
  userId: number | string;
  userName: string;
  hotelId: number;
  hotelName: string;
  roomId: number;
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  roomCost: number;
  tax: number;
  total: number;
  status: string;
  createdAt: string;
}