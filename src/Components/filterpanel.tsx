interface FilterPanelProps {
  location: string;
  setLocation: (value: string) => void;

  minRating: number;
  setMinRating: (value: number) => void;
}

function FilterPanel({
  location,
  setLocation,
  minRating,
  setMinRating
}: FilterPanelProps) {
  return (
    <div className="filter-panel">
      <div>
        <label>Location</label>

        <select
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        >
          <option value="">
            All Locations
          </option>

          <option value="Coimbatore">
            Coimbatore
          </option>

          <option value="Chennai">
            Chennai
          </option>

          <option value="Goa">
            Goa
          </option>

          <option value="Bangalore">
            Bangalore
          </option>

          <option value="Ooty">
            Ooty
          </option>
        </select>
      </div>

      <div>
        <label>Minimum Rating</label>

        <select
          value={minRating}
          onChange={(e) =>
            setMinRating(
              Number(e.target.value)
            )
          }
        >
          <option value={0}>
            Any Rating
          </option>

          <option value={4}>
            4.0+
          </option>

          <option value={4.5}>
            4.5+
          </option>

          <option value={4.8}>
            4.8+
          </option>
        </select>
      </div>
    </div>
  );
}

export default FilterPanel;