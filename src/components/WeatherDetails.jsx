import React from 'react';

function WeatherDetails({ weather, unit }) {
  if (!weather) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Weather Details</h3>
        <p className="text-gray-500 text-center">Search for a city to see detailed weather information</p>
      </div>
    );
  }

  const unitSymbol = unit === 'fahrenheit' ? '°F' : '°C';

  // Mock data for additional details (in a real app, these would come from the API)
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
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Weather Details</h3>
      
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
          <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className={`bg-${detail.color}-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3`}>
              <span className="text-2xl">{detail.icon}</span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">{detail.label}</p>
            <p className={`text-lg font-semibold text-${detail.color}-600`}>{detail.value}</p>
          </div>
        ))}
      </div>

      {/* Pollen Level */}
      <div className="mt-6 pt-6 border-t border-gray-200/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-gray-600">🌼 Pollen Level</p>
            <p className="text-lg font-semibold text-green-600">{additionalDetails.pollen}</p>
          </div>
          <div className="flex-1 max-w-xs mx-auto sm:mx-0">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full transition-all duration-500" style={{ width: '30%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;