import { useState } from "react";
import { useBookingStore } from "../store/bookingStore";
import { useAuthStore } from "../store/authStore";

interface PaymentProps {
  onComplete: () => void;
}

function Payment({
  onComplete
}: PaymentProps) {
  const user = useAuthStore(
    (state) => state.user
  );

  const hotel = useBookingStore(
    (state) => state.selectedHotel
  );

  const room = useBookingStore(
    (state) => state.selectedRoom
  );

  const getTotal = useBookingStore(
    (state) => state.getTotal
  );

  const [cardNumber, setCardNumber] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvv, setCvv] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  if (!user || !hotel || !room) {
    return (
      <div className="protected-card">
        <span>🔐</span>
        <h2>Payment unavailable</h2>
        <p>
          Please complete your booking first.
        </p>
      </div>
    );
  }

  const total = getTotal();

  const formatCardNumber = (
    value: string
  ) => {
    const digits = value
      .replace(/\D/g, "")
      .slice(0, 16);

    return digits
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const handlePayment = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setError("");

    const cleanCard =
      cardNumber.replace(/\s/g, "");

    if (
      cleanCard.length !== 16 ||
      !/^\d+$/.test(cleanCard)
    ) {
      setError(
        "Enter a valid 16-digit card number."
      );
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setError(
        "Enter expiry date as MM/YY."
      );
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      setError(
        "Enter a valid CVV."
      );
      return;
    }

    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    setLoading(false);

    onComplete();
  };

  return (
    <section className="payment-section">
      <div className="payment-header">
        <span>SECURE CHECKOUT</span>

        <h1>Complete Payment</h1>

        <p>
          Your payment information is protected.
        </p>
      </div>

      <div className="payment-layout">
        <div className="payment-form-card">
          <div className="secure-label">
            🔒 Secure Payment
          </div>

          <form onSubmit={handlePayment}>
            <label>Card Number</label>

            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) =>
                setCardNumber(
                  formatCardNumber(
                    e.target.value
                  )
                )
              }
              maxLength={19}
              required
            />

            <div className="payment-input-row">
              <div>
                <label>Expiry</label>

                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) =>
                    setExpiry(
                      e.target.value
                        .replace(
                          /[^0-9/]/g,
                          ""
                        )
                        .slice(0, 5)
                    )
                  }
                  maxLength={5}
                  required
                />
              </div>

              <div>
                <label>CVV</label>

                <input
                  type="password"
                  placeholder="•••"
                  value={cvv}
                  onChange={(e) =>
                    setCvv(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4)
                    )
                  }
                  maxLength={4}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button
              className="primary-button"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Processing Payment..."
                : `Pay ₹${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="payment-order">
          <span>YOUR BOOKING</span>

          <h2>{hotel.name}</h2>

          <p>{room.type}</p>

          <div className="order-divider" />

          <div className="price-row">
            <span>Room</span>

            <strong>
              ₹{room.price.toLocaleString()}
            </strong>
          </div>

          <div className="price-total">
            <span>Total</span>

            <strong>
              ₹{total.toFixed(2)}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Payment;