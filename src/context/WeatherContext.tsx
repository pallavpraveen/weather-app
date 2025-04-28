import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

interface WeatherContextType {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  searchHistory: string[];
  fetchWeather: (city: string) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching weather for:', city);
      console.log('API Key:', API_KEY ? 'Present' : 'Missing');
      
      const response = await axios.get(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      console.log('API Response:', response.data);
      
      const newWeatherData: WeatherData = {
        city: response.data.name,
        temperature: response.data.main.temp,
        condition: response.data.weather[0].main,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        icon: response.data.weather[0].icon,
      };

      setWeatherData(newWeatherData);
      
      // Update search history
      setSearchHistory(prev => {
        const newHistory = [city, ...prev.filter(item => item !== city)].slice(0, 5);
        return newHistory;
      });
    } catch (err) {
      console.error('Error fetching weather:', err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError('Invalid API key. Please check your configuration.');
        } else if (err.response?.status === 404) {
          setError('City not found. Please try a different name.');
        } else {
          setError(err.response?.data?.message || 'Failed to fetch weather data');
        }
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const value = {
    weatherData,
    loading,
    error,
    searchHistory,
    fetchWeather,
  };

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}; 