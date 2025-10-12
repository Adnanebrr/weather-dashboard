import React from 'react';

function WeatherDetails({ weather, unit, theme }) {
  if (!weather) {
    const containerClass = theme === 'dark'
      ? "bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700/50"
      : "bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20";

    return (
      <div className={containerClass}>
        <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Weather Details
        </h3>
        <p className={theme === 'dark' ? "text-gray-400 text-center" : "text-gray-500 text-center"}>
          Search for a city to see detailed weather information
        </p>
      </div>
    );
  }

  const unitSymbol = unit === 'fahrenheit' ? '°F' : '°C';

  const containerClass = theme === 'dark'
    ? "bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700/50"
    : "bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20";

  const borderColor = theme === 'dark' ? 'border-gray-600/50' : 'border-gray-200/50';
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const labelColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  // Mock data for additional details
  const additionalDetails = {
    airQuality: 'Good',
    pollen: 'Low',
    uvIndex: 'Moderate (5)',
    visibility: unit === 'fahrenheit' ? '10 mi' : '16 km',
    sunrise: '6:45 AM',
    sunset: '7:30 PM',
    feelsLike: `${weather.feelsLike || weather.temperature}${unitSymbol}`
  };

  return (
    <div className={containerClass}>
      <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Weather Details
      </h3>
      
      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {[
          { label: 'Air Quality', value: additionalDetails.airQuality, icon: '🌫️', color: 'green' },
          { label: 'UV Index', value: additionalDetails.uvIndex, icon: '☀️', color: 'yellow' },
          { label: 'Visibility', value: additionalDetails.visibility, icon: '👁️', color: 'blue' },
          { label: 'Sunrise', value: additionalDetails.sunrise, icon: '🌅', color: 'orange' },
          { label: 'Sunset', value: additionalDetails.sunset, icon: '🌇', color: 'purple' },
          { label: 'Feels Like', value: additionalDetails.feelsLike, icon: '🌡️', color: 'gray' }
        ].map((detail, index) => (
          <div key={index} className={`text-center p-4 rounded-xl shadow-sm border ${
            theme === 'dark' 
              ? `bg-${detail.color}-900/30 border-${detail.color}-800/50` 
              : 'bg-white border-gray-100'
          }`}>
            <div className={`rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 ${
              theme === 'dark' ? `bg-${detail.color}-800/50` : `bg-${detail.color}-100`
            }`}>
              <span className="text-2xl">{detail.icon}</span>
            </div>
            <p className={`text-sm font-medium mb-1 ${labelColor}`}>{detail.label}</p>
            <p className={`text-lg font-semibold ${
              theme === 'dark' ? `text-${detail.color}-300` : `text-${detail.color}-600`
            }`}>
              {detail.value}
            </p>
          </div>
        ))}
      </div>

      {/* Pollen Level */}
      <div className={`mt-6 pt-6 border-t ${borderColor}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-center sm:text-left">
            <p className={`text-sm font-medium ${labelColor}`}>🌼 Pollen Level</p>
            <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`}>
              {additionalDetails.pollen}
            </p>
          </div>
          <div className="flex-1 max-w-xs mx-auto sm:mx-0">
            <div className={`w-full rounded-full h-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div className="bg-green-500 h-3 rounded-full transition-all duration-500" style={{ width: '30%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;