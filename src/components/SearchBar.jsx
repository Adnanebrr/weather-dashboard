import React, { useState } from 'react';

function SearchBar({ onSearch, onUseMyLocation, userLocation }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="flex-1 px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 sm:py-2 rounded-lg transition font-semibold text-base"
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
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition font-semibold text-base ${
            userLocation
              ? 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>📍</span>
          {userLocation ? 'Use My Location' : 'Getting Location...'}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;