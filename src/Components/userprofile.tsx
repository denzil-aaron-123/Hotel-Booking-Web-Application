import { useAuthStore } from "../store/authStore";
import { useBookingStore } from "../store/bookingStore";

function UserProfile() {
  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
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

  const getStayDuration =
    useBookingStore(
      (state) => state.getStayDuration
    );

  const getTotal =
    useBookingStore(
      (state) => state.getTotal
    );

  if (!user) {
    return (
      <div className="protected-card">
        <span>🔐</span>

        <h2>Sign in required</h2>

        <p>
          Please sign in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <section className="profile-section">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.name
            .charAt(0)
            .toUpperCase()}
        </div>

        <div>
          <span>MY ACCOUNT</span>

          <h1>{user.name}</h1>

          <p>{user.email}</p>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <span>PERSONAL INFORMATION</span>

          <h2>Account Details</h2>

          <div className="profile-row">
            <span>Name</span>
            <strong>{user.name}</strong>
          </div>

          <div className="profile-row">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="profile-row">
            <span>User ID</span>
            <strong>{user.id}</strong>
          </div>

          <button
            className="logout-profile"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        <div className="profile-card">
          <span>CURRENT BOOKING</span>

          <h2>Booking Details</h2>

          {!hotel || !room ? (
            <div className="empty-booking">
              <span>🏨</span>

              <p>
                No active booking.
              </p>
            </div>
          ) : (
            <>
              <h3>{hotel.name}</h3>

              <p>
                {room.type} · Room{" "}
                {room.roomNumber}
              </p>

              <div className="profile-row">
                <span>Check-in</span>
                <strong>
                  {checkIn}
                </strong>
              </div>

              <div className="profile-row">
                <span>Check-out</span>
                <strong>
                  {checkOut}
                </strong>
              </div>

              <div className="profile-row">
                <span>Guests</span>
                <strong>
                  {guests}
                </strong>
              </div>

              <div className="profile-row">
                <span>Stay</span>
                <strong>
                  {getStayDuration()} nights
                </strong>
              </div>

              <div className="profile-total">
                <span>Total</span>

                <strong>
                  ₹{getTotal().toFixed(2)}
                </strong>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default UserProfile;