interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

function SearchBar({
  search,
  setSearch
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <span>🔎</span>

      <input
        type="text"
        placeholder="Search hotels or destinations..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {search && (
        <button
          onClick={() => setSearch("")}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;