import React from 'react';

<<<<<<< HEAD
function Forecast({ forecast, unit, theme }) {
=======
function Forecast({ forecast, unit }) {
>>>>>>> 487cd561df4188208ed31cdea52eb52cc7dd1261
  if (!forecast || forecast.length === 0) {
    const containerClass = theme === 'dark'
      ? "bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-gray-700/50"
      : "bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-white/20";

    return (
      <div className={containerClass}>
        <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          5-Day Forecast
        </h3>
        <p className={theme === 'dark' ? "text-gray-400 text-center" : "text-gray-500 text-center"}>
          Search for a city to see the forecast
        </p>
      </div>
    );
  }

  const unitSymbol = unit === 'fahrenheit' ? '°F' : '°C';

<<<<<<< HEAD
  const containerClass = theme === 'dark'
    ? "bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-gray-700/50"
    : "bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-white/20";

  const cardClass = theme === 'dark'
    ? "flex items-center justify-between p-4 bg-gray-700/50 rounded-xl shadow-sm border border-gray-600/50 hover:shadow-md transition-shadow"
    : "flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow";

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const secondaryTextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const tempColor = theme === 'dark' ? 'text-white' : 'text-gray-800';

=======
>>>>>>> 487cd561df4188208ed31cdea52eb52cc7dd1261
  // Get day names for the next 5 days
  const getDayName = (offset) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return days[date.getDay()];
  };

  return (
    <div className={containerClass}>
      <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        5-Day Forecast
      </h3>
      
      {/* Forecast Cards */}
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div key={index} className={cardClass}>
            <div className="flex items-center space-x-4">
              <div className="text-center min-w-[80px]">
                <p className={`text-sm font-semibold ${textColor}`}>
                  {getDayName(index + 1).substring(0, 3)}
                </p>
                <p className={`text-xs ${secondaryTextColor}`}>
                  {new Date().getDate() + index + 1}/{new Date().getMonth() + 1}
                </p>
              </div>
              <img 
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} 
                alt={day.description}
                className="w-12 h-12"
              />
              <div>
                <p className={`text-sm capitalize ${textColor}`}>{day.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
<<<<<<< HEAD
              <span className={`text-lg font-bold ${tempColor}`}>{day.maxTemp}{unitSymbol}</span>
              <span className={`text-lg ${secondaryTextColor}`}>/</span>
              <span className={`text-lg ${secondaryTextColor}`}>{day.minTemp}{unitSymbol}</span>
=======
              <span className="text-lg font-bold text-gray-800">{day.maxTemp}{unitSymbol}</span>
              <span className="text-lg text-gray-400">/</span>
              <span className="text-lg text-gray-500">{day.minTemp}{unitSymbol}</span>
>>>>>>> 487cd561df4188208ed31cdea52eb52cc7dd1261
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;