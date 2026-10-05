import { useState } from "react";
import SearchBar from "./searchbar";
import FilterPanel from "./filterpanel";
import HotelList from "./hotellist";
import type { Hotel } from "../types/hotel";

interface HomeProps {
  onSelectHotel: (hotel: Hotel) => void;
}

function Home({
  onSelectHotel
}: HomeProps) {
  const [search, setSearch] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [minRating, setMinRating] =
    useState(0);

  return (
    <main>
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-tag">
              ✦ YOUR PERFECT STAY AWAITS
            </span>

            <h1>
              Find a place
              <br />
              <em>worth staying for.</em>
            </h1>

            <p>
              Discover handpicked hotels,
              comfortable rooms and memorable
              stays across India.
            </p>

            <SearchBar
              search={search}
              setSearch={setSearch}
            />
          </div>
        </div>
      </section>

      <section className="hotel-section">
        <div className="section-heading">
          <div>
            <span>EXPLORE</span>
            <h2>Popular stays</h2>
          </div>

          <p>
            Choose from our collection of
            carefully selected hotels.
          </p>
        </div>

        <FilterPanel
          location={location}
          setLocation={setLocation}
          minRating={minRating}
          setMinRating={setMinRating}
        />

        <HotelList
          search={search}
          location={location}
          minRating={minRating}
          onSelectHotel={onSelectHotel}
        />
      </section>
    </main>
  );
}

export default Home;