import { useEffect, useState } from "react";
import {
  getReservations,
  updateReservation,
  deleteReservation
} from "../services/api";

import { useAuthStore } from "../store/authStore";
import type { Reservation } from "../types/hotel";

function ReservationHistory() {
  const user = useAuthStore(
    (state) => state.user
  );

  const [reservations, setReservations] =
    useState<Reservation[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadReservations = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const data =
        await getReservations();

      const userReservations =
        data.filter(
          (reservation: Reservation) =>
            String(reservation.userId) ===
            String(user.id)
        );

      setReservations(
        userReservations
      );
    } catch {
      setError(
        "Unable to load reservations."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, [user]);

  const handleCancel = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Cancel this reservation?"
      );

    if (!confirmed) return;

    try {
      await updateReservation(id, {
        status: "Cancelled"
      });

      await loadReservations();
    } catch {
      setError(
        "Unable to cancel reservation."
      );
    }
  };

  const handleDelete = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Delete this reservation permanently?"
      );

    if (!confirmed) return;

    try {
      await deleteReservation(id);

      await loadReservations();
    } catch {
      setError(
        "Unable to delete reservation."
      );
    }
  };

  if (!user) {
    return (
      <div className="protected-card">
        <span>🔐</span>

        <h2>Sign in required</h2>

        <p>
          Please sign in to view your bookings.
        </p>
      </div>
    );
  }

  return (
    <section className="history-section">
      <div className="section-heading">
        <div>
          <span>YOUR ACCOUNT</span>

          <h2>Reservation History</h2>
        </div>

        <p>
          Manage all your hotel reservations.
        </p>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner" />
          Loading reservations...
        </div>
      )}

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {!loading &&
        reservations.length === 0 && (
          <div className="empty-state">
            <span>📋</span>

            <h3>No reservations yet</h3>

            <p>
              Your bookings will appear here.
            </p>
          </div>
        )}

      <div className="reservation-list">
        {reservations.map(
          (reservation) => (
            <div
              className="reservation-card"
              key={reservation.id}
            >
              <div className="reservation-icon">
                🏨
              </div>

              <div className="reservation-info">
                <div>
                  <span>
                    {reservation.status}
                  </span>

                  <h3>
                    {reservation.hotelName}
                  </h3>

                  <p>
                    {reservation.roomType}
                    {" · "}
                    Room{" "}
                    {reservation.roomNumber}
                  </p>
                </div>

                <div className="reservation-dates">
                  <div>
                    <small>
                      CHECK-IN
                    </small>

                    <strong>
                      {reservation.checkIn}
                    </strong>
                  </div>

                  <div>
                    <small>
                      CHECK-OUT
                    </small>

                    <strong>
                      {reservation.checkOut}
                    </strong>
                  </div>

                  <div>
                    <small>
                      TOTAL
                    </small>

                    <strong>
                      ₹
                      {reservation.total.toFixed(
                        2
                      )}
                    </strong>
                  </div>
                </div>

                <div className="reservation-actions">
                  {reservation.status !==
                    "Cancelled" && (
                    <button
                      className="secondary-button"
                      onClick={() =>
                        handleCancel(
                          reservation.id!
                        )
                      }
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    className="danger-button"
                    onClick={() =>
                      handleDelete(
                        reservation.id!
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default ReservationHistory;