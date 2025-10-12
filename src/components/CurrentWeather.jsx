import React from 'react';

function CurrentWeather({ weather, unit }) {
  if (!weather) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20">
        <div className="text-6xl mb-4">🌤️</div>
        <p className="text-gray-600 text-lg">Search for a city to see current weather conditions</p>
      </div>
    );
  }

  const unitSymbol = unit === 'fahrenheit' ? '°F' : '°C';

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 mb-6 border border-white/20">
      {/* Main Weather Info */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-8">
        <div className="text-center md:text-left mb-4 md:mb-0 flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{weather.city}</h2>
          <p className="text-5xl md:text-6xl font-bold text-gray-800 mb-2">
            {weather.temperature}{unitSymbol}
          </p>
          <p className="text-lg md:text-xl text-gray-600 capitalize">{weather.description}</p>
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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-6 border-t border-gray-200/50">
        <div className="text-center p-3 bg-blue-50 rounded-xl">
          <p className="text-gray-500 text-sm mb-1">💧 Humidity</p>
          <p className="text-xl md:text-2xl font-semibold text-blue-600">{weather.humidity}%</p>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-xl">
          <p className="text-gray-500 text-sm mb-1">💨 Wind</p>
          <p className="text-xl md:text-2xl font-semibold text-green-600">{weather.wind} {unit === 'fahrenheit' ? 'mph' : 'km/h'}</p>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-xl col-span-2 md:col-span-1">
          <p className="text-gray-500 text-sm mb-1">📊 Pressure</p>
          <p className="text-xl md:text-2xl font-semibold text-purple-600">{weather.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;