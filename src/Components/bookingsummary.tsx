import { useState } from "react";
import {
  createReservation
} from "../services/api";

import { useAuthStore } from "../store/authStore";
import { useBookingStore } from "../store/bookingStore";

interface BookingSummaryProps {
  onPayment: () => void;
}

function BookingSummary({
  onPayment
}: BookingSummaryProps) {
  const user = useAuthStore(
    (state) => state.user
  );

  const hotel = useBookingStore(
    (state) => state.selectedHotel
  );

  const room = useBookingStore(
    (state) => state.selectedRoom
  );

  const checkIn = useBookingStore(
    (state) => state.checkIn
  );

  const checkOut = useBookingStore(
    (state) => state.checkOut
  );

  const guests = useBookingStore(
    (state) => state.guests
  );

  const updateDates = useBookingStore(
    (state) => state.updateDates
  );

  const updateGuests = useBookingStore(
    (state) => state.updateGuests
  );

  const getStayDuration =
    useBookingStore(
      (state) => state.getStayDuration
    );

  const getRoomCost =
    useBookingStore(
      (state) => state.getRoomCost
    );

  const getTax = useBookingStore(
    (state) => state.getTax
  );

  const getTotal = useBookingStore(
    (state) => state.getTotal
  );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  if (!user) {
    return (
      <div className="protected-card">
        <span>🔐</span>
        <h2>Sign in required</h2>
        <p>
          Please sign in before making a
          reservation.
        </p>
      </div>
    );
  }

  if (!hotel || !room) {
    return (
      <div className="protected-card">
        <span>🏨</span>
        <h2>No room selected</h2>
        <p>
          Please select a hotel and room first.
        </p>
      </div>
    );
  }

  const nights = getStayDuration();
  const roomCost = getRoomCost();
  const tax = getTax();
  const total = getTotal();

  const handleBooking = async () => {
    setError("");

    if (!checkIn || !checkOut) {
      setError(
        "Please select check-in and check-out dates."
      );
      return;
    }

    if (nights <= 0) {
      setError(
        "Check-out must be after check-in."
      );
      return;
    }

    try {
      setLoading(true);

      await createReservation({
        userId: user.id,
        userName: user.name,
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomId: room.id,
        roomType: room.type,
        roomNumber: room.roomNumber,
        checkIn,
        checkOut,
        guests,
        nights,
        roomCost,
        tax,
        total,
        status: "Pending Payment",
        createdAt:
          new Date().toISOString()
      });

      onPayment();
    } catch {
      setError(
        "Unable to create reservation."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="booking-section">
      <div className="booking-main">
        <span>RESERVATION</span>

        <h1>Complete your booking</h1>

        <div className="booking-card">
          <div>
            <span>HOTEL</span>
            <h2>{hotel.name}</h2>
            <p>📍 {hotel.location}</p>
          </div>

          <div className="booking-details-grid">
            <div>
              <label>Check-in</label>

              <input
                type="date"
                value={checkIn}
                onChange={(e) =>
                  updateDates(
                    e.target.value,
                    checkOut
                  )
                }
              />
            </div>

            <div>
              <label>Check-out</label>

              <input
                type="date"
                value={checkOut}
                onChange={(e) =>
                  updateDates(
                    checkIn,
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label>Guests</label>

              <input
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) =>
                  updateGuests(
                    Number(e.target.value)
                  )
                }
              />
            </div>
          </div>

          <div className="selected-room-summary">
            <span>ROOM</span>

            <h3>{room.type}</h3>

            <p>
              Room {room.roomNumber}
            </p>
          </div>
        </div>
      </div>

      <aside className="price-card">
        <h2>Price Summary</h2>

        <div className="price-row">
          <span>Room</span>

          <strong>
            ₹{room.price.toLocaleString()}
            × {nights}
          </strong>
        </div>

        <div className="price-row">
          <span>Room cost</span>

          <strong>
            ₹{roomCost.toLocaleString()}
          </strong>
        </div>

        <div className="price-row">
          <span>Tax (12%)</span>

          <strong>
            ₹{tax.toFixed(2)}
          </strong>
        </div>

        <div className="price-total">
          <span>Total</span>

          <strong>
            ₹{total.toFixed(2)}
          </strong>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button
          className="primary-button"
          onClick={handleBooking}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : "Continue to Payment"}
        </button>
      </aside>
    </section>
  );
}

export default BookingSummary;