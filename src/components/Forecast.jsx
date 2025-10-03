import React from 'react';

function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h3>
        <p className="text-gray-500 text-center">Search for a city to see the forecast</p>
      </div>
    );
  }

  // Get day names for the next 5 days
  const getDayName = (offset) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return days[date.getDay()];
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-white/20">
      <h3 className="text-xl font-bold text-gray-800 mb-6">5-Day Forecast</h3>
      
      {/* Forecast Cards */}
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="text-center min-w-[80px]">
                <p className="text-sm font-semibold text-gray-600">
                  {getDayName(index + 1).substring(0, 3)}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date().getDate() + index + 1}/{new Date().getMonth() + 1}
                </p>
              </div>
              <img 
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} 
                alt={day.description}
                className="w-12 h-12"
              />
              <div>
                <p className="text-sm text-gray-600 capitalize">{day.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-lg font-bold text-gray-800">{day.maxTemp}°</span>
              <span className="text-lg text-gray-400">/</span>
              <span className="text-lg text-gray-500">{day.minTemp}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;