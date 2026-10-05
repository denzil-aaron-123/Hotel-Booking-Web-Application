import { useEffect, useState } from "react";
import { getRooms } from "../services/api";
import type {
  Hotel,
  Room
} from "../types/hotel";
import { useBookingStore } from "../store/bookingStore";

interface HotelDetailProps {
  hotel: Hotel;
  onBack: () => void;
  onContinue: () => void;
}

function HotelDetail({
  hotel,
  onBack,
  onContinue
}: HotelDetailProps) {
  const [rooms, setRooms] =
    useState<Room[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const selectedRoom =
    useBookingStore(
      (state) => state.selectedRoom
    );

  const selectHotel =
    useBookingStore(
      (state) => state.selectHotel
    );

  const selectRoom =
    useBookingStore(
      (state) => state.selectRoom
    );

  useEffect(() => {
    selectHotel(hotel);

    const loadRooms = async () => {
      try {
        const data = await getRooms(
          hotel.id
        );

        setRooms(data);
      } catch {
        setError(
          "Unable to load rooms."
        );
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, [hotel, selectHotel]);

  return (
    <section className="detail-section">
      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to hotels
      </button>

      <div className="detail-card">
        <img
          src={`${hotel.image}?auto=format&fit=crop&w=1200&q=85`}
          alt={hotel.name}
        />

        <div className="detail-info">
          <div className="hotel-location">
            📍 {hotel.location}
          </div>

          <h1>{hotel.name}</h1>

          <div className="large-rating">
            ★ {hotel.rating}
          </div>

          <p>{hotel.description}</p>
        </div>
      </div>

      <div className="rooms-section">
        <div className="section-heading">
          <div>
            <span>AVAILABLE ROOMS</span>
            <h2>Choose your room</h2>
          </div>
        </div>

        {loading && (
          <div className="loading">
            <div className="spinner" />
            Loading rooms...
          </div>
        )}

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <div className="room-grid">
          {rooms
            .filter(
              (room) => room.available
            )
            .map((room) => (
              <div
                key={room.id}
                className={`room-card ${
                  selectedRoom?.id === room.id
                    ? "room-selected"
                    : ""
                }`}
                onClick={() =>
                  selectRoom(room)
                }
              >
                <div className="room-icon">
                  🛏️
                </div>

                <div>
                  <h3>{room.type}</h3>

                  <p>
                    Room {room.roomNumber}
                  </p>
                </div>

                <strong>
                  ₹
                  {room.price.toLocaleString()}
                  <small>/night</small>
                </strong>

                {selectedRoom?.id ===
                  room.id && (
                  <span className="selected-badge">
                    ✓ Selected
                  </span>
                )}
              </div>
            ))}
        </div>

        <button
          className="primary-button continue-button"
          disabled={!selectedRoom}
          onClick={onContinue}
        >
          Continue to Booking →
        </button>
      </div>
    </section>
  );
}

export default HotelDetail;