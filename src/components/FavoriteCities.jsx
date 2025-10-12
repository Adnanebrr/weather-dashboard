import React from 'react';

function FavoriteCities({ favorites, onSelectFavorite, onRemoveFavorite, theme }) {
  if (!favorites || favorites.length === 0) {
    return null;
  }

  const containerClass = theme === 'dark'
    ? "bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-gray-700/50"
    : "bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-white/20";

  const favoriteItemClass = theme === 'dark'
    ? "flex items-center gap-2 bg-blue-900/30 border border-blue-800/50 rounded-full px-4 py-2"
    : "flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2";

  const cityButtonClass = theme === 'dark'
    ? "text-blue-300 hover:text-blue-100 font-medium text-sm"
    : "text-blue-600 hover:text-blue-800 font-medium text-sm";

  const removeButtonClass = theme === 'dark'
    ? "text-red-400 hover:text-red-300 text-lg"
    : "text-red-400 hover:text-red-600 text-lg";

  return (
    <div className={containerClass}>
      <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Favorite Cities
      </h3>
      <div className="flex flex-wrap gap-3">
        {favorites.map((city, index) => (
          <div key={index} className={favoriteItemClass}>
            <button
              onClick={() => onSelectFavorite(city)}
              className={cityButtonClass}
            >
              {city}
            </button>
            <button
              onClick={() => onRemoveFavorite(city)}
              className={removeButtonClass}
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