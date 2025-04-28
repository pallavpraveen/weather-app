import { ChakraProvider, Box, Container } from '@chakra-ui/react'
import WeatherDashboard from './components/WeatherDashboard'
import { WeatherProvider } from './context/WeatherContext'
import theme from './theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <WeatherProvider>
        <Box minH="100vh">
          <Container maxW="container.xl" py={8}>
            <WeatherDashboard />
          </Container>
        </Box>
      </WeatherProvider>
    </ChakraProvider>
  )
}

export default App 