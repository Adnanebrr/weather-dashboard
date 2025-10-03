import React from 'react';

function FavoriteCities({ favorites, onSelectFavorite, onRemoveFavorite }) {
  if (!favorites || favorites.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Favorite Cities</h3>
      <div className="flex flex-wrap gap-3">
        {favorites.map((city, index) => (
          <div key={index} className="flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2">
            <button
              onClick={() => onSelectFavorite(city)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              {city}
            </button>
            <button
              onClick={() => onRemoveFavorite(city)}
              className="text-red-400 hover:text-red-600 text-lg"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteCities;