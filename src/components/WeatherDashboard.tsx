import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Heading,
  HStack,
  useColorModeValue,
  Image,
  Spinner,
  Alert,
  AlertIcon,
  List,
  ListItem,
  useToast,
  Icon,
  Flex,
  Badge,
  Tooltip,
  useColorMode,
  IconButton,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from '../context/WeatherContext';
import { FaSearch, FaHistory, FaTemperatureHigh, FaWind, FaTint, FaSun, FaMoon } from 'react-icons/fa';

const MotionBox = motion(Box);

const WeatherDashboard: React.FC = () => {
  const [city, setCity] = useState('');
  const { weatherData, loading, error, searchHistory, fetchWeather } = useWeather();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    } else {
      toast({
        title: 'Hey there!',
        description: 'You forgot to tell me which city you want to check!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const getWeatherEmoji = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return '☀️';
      case 'clouds':
        return '☁️';
      case 'rain':
        return '🌧️';
      case 'snow':
        return '❄️';
      case 'thunderstorm':
        return '⛈️';
      default:
        return '🌈';
    }
  };

  const getWeatherMessage = (temp: number) => {
    if (temp > 30) return "It's a scorcher out there! Stay hydrated!";
    if (temp > 20) return "Perfect weather for a day out!";
    if (temp > 10) return "A bit chilly, but still nice!";
    if (temp > 0) return "Brrr! Time to bundle up!";
    return "Freezing cold! Stay warm!";
  };

  return (
    <VStack spacing={8} align="stretch" maxW="800px" mx="auto" p={4}>
      <Flex justify="space-between" align="center">
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading
            size="xl"
            mb={2}
            bgGradient="linear(to-r, blue.400, teal.400)"
            bgClip="text"
          >
            Weather Dashboard
          </Heading>
          <Text color="gray.500">
            Check the weather anywhere in the world
          </Text>
        </MotionBox>
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          variant="ghost"
          size="lg"
        />
      </Flex>

      <MotionBox
        as="form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <HStack spacing={2}>
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Where would you like to check the weather?"
            size="lg"
            isDisabled={loading}
            _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
          />
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            isLoading={loading}
            loadingText="Looking up..."
            isDisabled={loading}
            leftIcon={<Icon as={FaSearch} />}
          >
            Check Weather
          </Button>
        </HStack>
      </MotionBox>

      {loading && (
        <Flex justify="center" align="center" minH="200px">
          <VStack spacing={4}>
            <Spinner
              size="xl"
              color="blue.400"
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
            />
            <Text color="gray.500">Just a moment while we check the weather...</Text>
          </VStack>
        </Flex>
      )}

      {error && (
        <MotionBox
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert status="error" borderRadius="lg">
            <AlertIcon />
            {error.includes('404') 
              ? "Hmm, I couldn't find that city. Maybe try a different spelling?" 
              : "Oops! Something went wrong. Let's try that again."}
          </Alert>
        </MotionBox>
      )}

      <AnimatePresence>
        {weatherData && (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            bg={cardBg}
            p={6}
            borderRadius="xl"
            boxShadow="xl"
            border="1px"
            borderColor={borderColor}
          >
            <VStack spacing={6} align="stretch">
              <Flex justify="space-between" align="center">
                <Heading size="lg" color={textColor}>
                  {weatherData.city}
                </Heading>
                <Badge colorScheme="blue" fontSize="lg" p={2}>
                  {getWeatherEmoji(weatherData.condition)}
                </Badge>
              </Flex>
              
              <HStack justify="center" spacing={8}>
                <VStack spacing={2}>
                  <Image
                    src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                    alt={weatherData.condition}
                    width="120px"
                    fallbackSrc="https://via.placeholder.com/120"
                  />
                  <Text fontSize="xl" fontWeight="bold" color={textColor}>
                    {weatherData.condition}
                  </Text>
                </VStack>
                
                <VStack spacing={4} align="start">
                  <HStack>
                    <Icon as={FaTemperatureHigh} color="red.400" />
                    <VStack align="start" spacing={0}>
                      <Text fontSize="4xl" fontWeight="bold" color={textColor}>
                        {Math.round(weatherData.temperature)}°C
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {getWeatherMessage(weatherData.temperature)}
                      </Text>
                    </VStack>
                  </HStack>
                  <HStack>
                    <Icon as={FaTint} color="blue.400" />
                    <Text fontSize="lg" color={textColor}>
                      Humidity: {weatherData.humidity}%
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaWind} color="gray.400" />
                    <Text fontSize="lg" color={textColor}>
                      Wind: {weatherData.windSpeed} km/h
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
            </VStack>
          </MotionBox>
        )}
      </AnimatePresence>

      {searchHistory.length > 0 && (
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <HStack mb={3}>
            <Icon as={FaHistory} color="gray.500" />
            <Heading size="md">Your Recent Searches</Heading>
          </HStack>
          <List spacing={2}>
            {searchHistory.map((searchedCity) => (
              <ListItem key={searchedCity}>
                <Tooltip label={`Check weather for ${searchedCity}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCity(searchedCity);
                      fetchWeather(searchedCity);
                    }}
                    isDisabled={loading}
                    width="100%"
                    justifyContent="flex-start"
                    _hover={{ bg: 'blue.50' }}
                  >
                    {searchedCity}
                  </Button>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </MotionBox>
      )}
    </VStack>
  );
};

export default WeatherDashboard; 