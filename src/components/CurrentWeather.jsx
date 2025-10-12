import React from 'react';

function CurrentWeather({ weather, unit, theme }) {
  if (!weather) {
    const containerClass = theme === 'dark'
      ? "bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-gray-700/50"
      : "bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20";

    return (
      <div className={containerClass}>
        <div className="text-6xl mb-4">🌤️</div>
        <p className={theme === 'dark' ? "text-gray-300 text-lg" : "text-gray-600 text-lg"}>
          Search for a city to see current weather conditions
        </p>
      </div>
    );
  }

  const unitSymbol = unit === 'fahrenheit' ? '°F' : '°C';

  const containerClass = theme === 'dark'
    ? "bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 mb-6 border border-gray-700/50"
    : "bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 mb-6 border border-white/20";

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const secondaryTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const borderColor = theme === 'dark' ? 'border-gray-600/50' : 'border-gray-200/50';

  return (
    <div className={containerClass}>
      {/* Main Weather Info */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-8">
        <div className="text-center md:text-left mb-4 md:mb-0 flex-1">
          <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${textColor}`}>{weather.city}</h2>
          <p className={`text-5xl md:text-6xl font-bold mb-2 ${textColor}`}>
            {weather.temperature}{unitSymbol}
          </p>
          <p className={`text-lg md:text-xl capitalize ${secondaryTextColor}`}>{weather.description}</p>
        </div>
        <div className="text-center">
          <img 
            src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`} 
            alt={weather.description}
            className="w-24 h-24 md:w-32 md:h-32 mx-auto filter drop-shadow-lg"
          />
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-6 border-t ${borderColor}`}>
        <div className={`text-center p-3 rounded-xl ${theme === 'dark' ? 'bg-blue-900/30 border border-blue-800/50' : 'bg-blue-50'}`}>
          <p className={`text-sm mb-1 ${secondaryTextColor}`}>💧 Humidity</p>
          <p className={`text-xl md:text-2xl font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>{weather.humidity}%</p>
        </div>
        <div className={`text-center p-3 rounded-xl ${theme === 'dark' ? 'bg-green-900/30 border border-green-800/50' : 'bg-green-50'}`}>
          <p className={`text-sm mb-1 ${secondaryTextColor}`}>💨 Wind</p>
          <p className={`text-xl md:text-2xl font-semibold ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`}>{weather.wind} {unit === 'fahrenheit' ? 'mph' : 'km/h'}</p>
        </div>
        <div className={`text-center p-3 rounded-xl col-span-2 md:col-span-1 ${theme === 'dark' ? 'bg-purple-900/30 border border-purple-800/50' : 'bg-purple-50'}`}>
          <p className={`text-sm mb-1 ${secondaryTextColor}`}>📊 Pressure</p>
          <p className={`text-xl md:text-2xl font-semibold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`}>{weather.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;