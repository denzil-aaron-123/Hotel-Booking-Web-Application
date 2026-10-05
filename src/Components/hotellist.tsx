import { useEffect, useState } from "react";
import { getHotels } from "../services/api";
import type { Hotel } from "../types/hotel";

interface HotelListProps {
  search: string;
  location: string;
  minRating: number;
  onSelectHotel: (hotel: Hotel) => void;
}

function HotelList({
  search,
  location,
  minRating,
  onSelectHotel
}: HotelListProps) {
  const [hotels, setHotels] =
    useState<Hotel[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadHotels = async () => {
      try {
        setLoading(true);

        const data = await getHotels();

        setHotels(data);
      } catch {
        setError(
          "Unable to load hotels. Make sure the REST API is running."
        );
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, []);

  const filteredHotels =
    hotels.filter((hotel) => {
      const searchMatch =
        hotel.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        hotel.location
          .toLowerCase()
          .includes(search.toLowerCase());

      const locationMatch =
        !location ||
        hotel.location === location;

      const ratingMatch =
        hotel.rating >= minRating;

      return (
        searchMatch &&
        locationMatch &&
        ratingMatch
      );
    });

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        Loading hotels...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-box">
        ⚠️ {error}
      </div>
    );
  }

  return (
    <div className="hotel-grid">
      {filteredHotels.map((hotel) => (
        <article
          className="hotel-card"
          key={hotel.id}
        >
          <div className="hotel-image">
            <img
              src={`${hotel.image}?auto=format&fit=crop&w=800&q=80`}
              alt={hotel.name}
            />

            <span className="rating">
              ★ {hotel.rating}
            </span>
          </div>

          <div className="hotel-content">
            <div className="hotel-location">
              📍 {hotel.location}
            </div>

            <h3>{hotel.name}</h3>

            <p>
              {hotel.description}
            </p>

            <div className="hotel-bottom">
              <div>
                <strong>
                  ₹{hotel.price.toLocaleString()}
                </strong>

                <span>
                  / night
                </span>
              </div>

              <button
                className="primary-button small"
                onClick={() =>
                  onSelectHotel(hotel)
                }
              >
                View Rooms
              </button>
            </div>
          </div>
        </article>
      ))}

      {filteredHotels.length === 0 && (
        <div className="empty-state">
          <span>🏨</span>
          <h3>No hotels found</h3>
          <p>
            Try changing your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default HotelList;