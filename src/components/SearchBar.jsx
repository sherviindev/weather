import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const cities = [
  "Zurich",
  "Zagreb",
  "Zanzibar",
  "Zaragoza",
  "Zibo",
  "Zhengzhou",
  "Zanjan",
  "Zahedan",
  "Zabul",
  "Zafarana",
];

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.trim()) {
      const filtered = cities.filter((c) =>
        c.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
    setCity("");
    setSuggestions([]);
  };

  const handleSelect = (selectedCity) => {
    setCity(selectedCity);
    onSearch(selectedCity);
    setSuggestions([]);
  };

  return (
    <div className="absolute top-6 right-6 w-60 md:w-72 z-50">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-b border-white/70 pb-1"
      >
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="جستجوی مکان..."
          className="bg-transparent text-white placeholder-white/60 outline-none text-sm md:text-base flex-1"
        />
        <button type="submit" className="text-white hover:opacity-80">
          <CiSearch size={22} />
        </button>
      </form>

      {/* پیشنهادها */}
      {suggestions.length > 0 && (
        <ul className="mt-2 bg-white/95 text-black rounded-md shadow-lg max-h-40 overflow-y-auto relative z-50">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(s)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
