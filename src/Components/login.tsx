import { useState } from "react";
import { loginUser } from "../services/auth";
import { useAuthStore } from "../store/authStore";

interface LoginProps {
  onClose: () => void;
}

function Login({ onClose }: LoginProps) {
  const login = useAuthStore(
    (state) => state.login
  );

  const [email, setEmail] = useState(
    "user@gmail.com"
  );

  const [password, setPassword] =
    useState("123456");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await loginUser(
        email,
        password
      );

      login(
        result.user,
        result.token
      );

      onClose();
    } catch (error: any) {
      setError(
        error.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="login-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <button
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="login-icon">
          🔐
        </div>

        <h2>Welcome Back</h2>

        <p>
          Sign in to continue your booking.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>
        </form>

        <div className="demo-login">
          <strong>Demo Account</strong>
          <span>
            user@gmail.com / 123456
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;