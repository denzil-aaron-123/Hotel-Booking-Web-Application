import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Login from "./login";

interface HeaderProps {
  page: string;
  setPage: (page: string) => void;
}

function Header({
  page,
  setPage
}: HeaderProps) {
  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const [showLogin, setShowLogin] =
    useState(false);

  return (
    <>
      <header className="header">
        <div
          className="logo"
          onClick={() => setPage("home")}
        >
          <span>🏨</span>
          StayNest
        </div>

        <nav>
          <button
            className={
              page === "home"
                ? "nav-active"
                : ""
            }
            onClick={() =>
              setPage("home")
            }
          >
            Home
          </button>

          <button
            onClick={() =>
              setPage("hotels")
            }
          >
            Hotels
          </button>

          {user && (
            <>
              <button
                onClick={() =>
                  setPage("history")
                }
              >
                My Bookings
              </button>

              <button
                onClick={() =>
                  setPage("profile")
                }
              >
                Profile
              </button>
            </>
          )}
        </nav>

        <div className="header-user">
          {user ? (
            <>
              <span className="welcome">
                Hi, {user.name}
              </span>

              <button
                className="logout-small"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="login-button"
              onClick={() =>
                setShowLogin(true)
              }
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {showLogin && (
        <Login
          onClose={() =>
            setShowLogin(false)
          }
        />
      )}
    </>
  );
}

export default Header;