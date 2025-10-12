import React, { useState } from 'react';

function SearchBar({ onSearch, onUseMyLocation, userLocation, theme }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const inputClass = theme === 'dark' 
    ? "flex-1 px-4 py-3 sm:py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-base placeholder-gray-400"
    : "flex-1 px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base";

  const buttonClass = theme === 'dark'
    ? "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 sm:py-2 rounded-lg transition font-semibold text-base"
    : "bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 sm:py-2 rounded-lg transition font-semibold text-base";

  const locationButtonClass = theme === 'dark'
    ? `flex items-center gap-2 px-6 py-3 rounded-lg transition font-semibold text-base ${
        userLocation
          ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
      }`
    : `flex items-center gap-2 px-6 py-3 rounded-lg transition font-semibold text-base ${
        userLocation
          ? 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`;

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className={inputClass}
          />
          <button
            type="submit"
            className={buttonClass}
          >
            Search
          </button>
        </div>
      </form>

      {/* Location Button */}
      <div className="flex justify-center">
        <button
          onClick={onUseMyLocation}
          disabled={!userLocation}
          className={locationButtonClass}
        >
          <span>📍</span>
          {userLocation ? 'Use My Location' : 'Getting Location...'}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;