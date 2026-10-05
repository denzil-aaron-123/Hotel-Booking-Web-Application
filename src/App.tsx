import { useState } from "react";

import Header from "./Components/header";
import Home from "./Components/home";
import HotelDetail from "./Components/hoteldetail";
import BookingSummary from "./Components/bookingsummary";
import Payment from "./Components/payment";
import ReservationHistory from "./Components/reservationhistory";

import { useBookingStore } from "./store/bookingStore";
import type { Hotel } from "./types/hotel";

import "./App.css";

function App() {
  const [page, setPage] =
    useState("home");

  const [selectedHotel, setSelectedHotel] =
    useState<Hotel | null>(null);

  const clearBooking =
    useBookingStore(
      (state) => state.clearBooking
    );

  const handleSelectHotel = (
    hotel: Hotel
  ) => {
    setSelectedHotel(hotel);

    setPage("hotel");
  };

  const handlePaymentComplete = () => {
    setPage("history");
  };

  const renderPage = () => {
    switch (page) {
      case "home":
      case "hotels":
        return (
          <Home
            onSelectHotel={
              handleSelectHotel
            }
          />
        );

      case "hotel":
        if (!selectedHotel) {
          return (
            <Home
              onSelectHotel={
                handleSelectHotel
              }
            />
          );
        }

        return (
          <HotelDetail
            hotel={selectedHotel}
            onBack={() =>
              setPage("home")
            }
            onContinue={() =>
              setPage("booking")
            }
          />
        );

      case "booking":
        return (
          <BookingSummary
            onPayment={() =>
              setPage("payment")
            }
          />
        );

      case "payment":
        return (
          <Payment
            onComplete={
              handlePaymentComplete
            }
          />
        );

      case "history":
        return (
          <ReservationHistory />
        );

      default:
        return (
          <Home
            onSelectHotel={
              handleSelectHotel
            }
          />
        );
    }
  };

  return (
    <div className="app">
      <Header
        page={page}
        setPage={setPage}
      />

      {renderPage()}

    </div>
  );
}

export default App;