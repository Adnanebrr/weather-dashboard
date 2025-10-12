import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherDetails from './components/WeatherDetails';
import FavoriteCities from './components/FavoriteCities';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [unit, setUnit] = useState('celsius');
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

  // Load preferences from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('weatherFavorites');
    const savedUnit = localStorage.getItem('weatherUnit');
    const savedTheme = localStorage.getItem('weatherTheme');
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedUnit) {
      setUnit(savedUnit);
    }
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    localStorage.setItem('weatherUnit', unit);
    localStorage.setItem('weatherTheme', theme);
  }, [favorites, unit, theme]);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Get user's current location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.log('Geolocation error:', error);
          setError('Unable to access your location. Please search for a city manually.');
        }
      );
    }
  }, []);

  // Fetch weather for user's location when available
  useEffect(() => {
    if (userLocation) {
      fetchWeatherByCoords(userLocation.lat, userLocation.lon);
    }
  }, [userLocation]);

  const handleSearch = async (city) => {
    await fetchWeatherData(city);
  };

  const handleSelectFavorite = async (city) => {
    await fetchWeatherData(city);
  };

  const handleAddFavorite = (city) => {
    if (city && !favorites.includes(city)) {
      setFavorites(prev => [...prev, city]);
    }
  };

  const handleRemoveFavorite = (cityToRemove) => {
    setFavorites(prev => prev.filter(city => city !== cityToRemove));
  };

  const handleUseMyLocation = () => {
    if (userLocation) {
      fetchWeatherByCoords(userLocation.lat, userLocation.lon);
    } else {
      setError('Location not available. Please enable location services.');
    }
  };

  const toggleUnit = () => {
    setUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError('');
    
    try {
      const unitsParam = unit === 'fahrenheit' ? 'imperial' : 'metric';
      
      // Fetch current weather by coordinates
      const currentResponse = await fetch(
        `${CURRENT_WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unitsParam}`
      );
      
      if (!currentResponse.ok) {
        throw new Error('Unable to fetch weather data for your location');
      }
      
      const currentData = await currentResponse.json();
      
      // Fetch 5-day forecast by coordinates
      const forecastResponse = await fetch(
        `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unitsParam}`
      );
      
      const forecastData = await forecastResponse.json();
      
      // Process current weather data
      const weatherData = {
        city: currentData.name,
        temperature: Math.round(currentData.main.temp),
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        humidity: currentData.main.humidity,
        wind: Math.round(currentData.wind.speed),
        pressure: currentData.main.pressure,
        feelsLike: Math.round(currentData.main.feels_like)
      };
      
      // Process forecast data - get one reading per day
      const dailyForecast = [];
      for (let i = 0; i < 5; i++) {
        const dayIndex = i * 8; // 3-hour intervals, 8 per day
        if (forecastData.list[dayIndex]) {
          const dayData = forecastData.list[dayIndex];
          dailyForecast.push({
            maxTemp: Math.round(dayData.main.temp_max),
            minTemp: Math.round(dayData.main.temp_min),
            icon: dayData.weather[0].icon,
            description: dayData.weather[0].description
          });
        }
      }
      
      setWeather(weatherData);
      setForecast(dailyForecast);
      
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data for your location');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError('');
    
    try {
      const unitsParam = unit === 'fahrenheit' ? 'imperial' : 'metric';
      
      // Fetch current weather
      const currentResponse = await fetch(
        `${CURRENT_WEATHER_URL}?q=${city}&appid=${API_KEY}&units=${unitsParam}`
      );
      
      if (!currentResponse.ok) {
        throw new Error('City not found');
      }
      
      const currentData = await currentResponse.json();
      
      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=${unitsParam}`
      );
      
      const forecastData = await forecastResponse.json();
      
      // Process current weather data
      const weatherData = {
        city: currentData.name,
        temperature: Math.round(currentData.main.temp),
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        humidity: currentData.main.humidity,
        wind: Math.round(currentData.wind.speed),
        pressure: currentData.main.pressure,
        feelsLike: Math.round(currentData.main.feels_like)
      };
      
      // Process forecast data - get one reading per day
      const dailyForecast = [];
      for (let i = 0; i < 5; i++) {
        const dayIndex = i * 8; // 3-hour intervals, 8 per day
        if (forecastData.list[dayIndex]) {
          const dayData = forecastData.list[dayIndex];
          dailyForecast.push({
            maxTemp: Math.round(dayData.main.temp_max),
            minTemp: Math.round(dayData.main.temp_min),
            icon: dayData.weather[0].icon,
            description: dayData.weather[0].description
          });
        }
      }
      
      setWeather(weatherData);
      setForecast(dailyForecast);
      
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  // Theme-based styles
  const backgroundGradient = theme === 'dark' 
    ? 'from-gray-900 via-gray-800 to-gray-900' 
    : 'from-blue-50 via-sky-100 to-blue-200';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} py-8 transition-colors duration-300`}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              🌤️ Weather Dashboard
            </h1>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Get accurate weather forecasts for any city
            </p>
          </div>
          
          {/* Controls Container */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-2 shadow-sm border border-white/20 dark:border-gray-700/50">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  theme === 'light' 
                    ? 'bg-yellow-400 text-yellow-900 shadow-md' 
                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                }`}
                title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? '☀️' : '🌙'}
              </button>
            </div>
            
            {/* Unit Toggle */}
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-2 shadow-sm border border-white/20 dark:border-gray-700/50">
              <span className="text-sm font-medium px-2 dark:text-gray-300">Units:</span>
              <button
                onClick={toggleUnit}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  unit === 'celsius'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                °C
              </button>
              <button
                onClick={toggleUnit}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  unit === 'fahrenheit'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                °F
              </button>
            </div>
          </div>
        </div>
        
        <SearchBar 
          onSearch={handleSearch} 
          onUseMyLocation={handleUseMyLocation}
          userLocation={userLocation}
          theme={theme}
        />
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
            <span className={`ml-4 text-lg font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Loading weather data...
            </span>
          </div>
        )}
        
        {error && (
          <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-6 py-4 rounded-xl mb-6 shadow-sm`}>
            <div className="flex items-center">
              <span className="text-lg mr-2">⚠️</span>
              <div>
                <strong className="font-semibold">Unable to fetch weather data</strong>
                <p className="mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {weather && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => handleAddFavorite(weather.city)}
              disabled={favorites.includes(weather.city)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm ${
                favorites.includes(weather.city)
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-gray-600'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg'
              }`}
            >
              {favorites.includes(weather.city) ? '✓ Added to Favorites' : '⭐ Add to Favorites'}
            </button>
          </div>
        )}
        
        <FavoriteCities 
          favorites={favorites}
          onSelectFavorite={handleSelectFavorite}
          onRemoveFavorite={handleRemoveFavorite}
          theme={theme}
        />
        
        <CurrentWeather weather={weather} unit={unit} theme={theme} />
        <Forecast forecast={forecast} unit={unit} theme={theme} />
        <WeatherDetails weather={weather} unit={unit} theme={theme} />
      </div>
    </div>
  );
}

export default App;