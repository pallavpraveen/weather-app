# 🌦️ Weather Dashboard

A modern, responsive weather application built with React, TypeScript, and Chakra UI that allows users to search for real-time weather information of any city worldwide using the OpenWeatherMap API.

![Weather Dashboard Preview](./public/weather-dashboard-preview.jpg)

## ✨ Features

- 🔍 Search for weather by city name
- 🌡️ Display current temperature, weather condition, humidity, and wind speed
- 🌤️ Show weather condition icons that match the current weather
- 📜 Recent search history (last 5 searches)
- ⏳ Elegant loading states and error handling
- 📱 Fully responsive design for all device sizes
- 🎨 Smooth animations and transitions using Framer Motion
- 🌓 Dark/Light mode toggle for user preference
- 🌐 Powered by OpenWeatherMap API

## 🛠️ Technologies Used

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Chakra UI** - Component library
- **Framer Motion** - Animations
- **Axios** - API requests
- **React Icons** - Icon library
- **OpenWeatherMap API** - Weather data

## 🚀 Live Demo

Check out the live application: [Weather Dashboard](https://pallavpraveen.github.io/weather-app/)

## 🧰 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key

## 📋 Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/pallavpraveen/weather-app.git
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

To get an API key:
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Copy the API key to your `.env` file

## 🖥️ Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

## 📤 Deployment

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

### Automatic Deployment with GitHub Actions

The project is set up with GitHub Actions for automatic deployment. To use it:

1. Go to your repository's Settings > Secrets and variables > Actions
2. Add a new secret named `OPENWEATHER_API_KEY` with your OpenWeatherMap API key
3. Push your changes to the main branch
4. GitHub Actions will automatically build and deploy your site

Your site will be available at:
```
https://pallavpraveen.github.io/weather-app/
```

## 📁 Project Structure

```
weather-app/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions workflow
├── public/                   # Static assets
│   └── weather-icon.svg
├── src/
│   ├── components/
│   │   └── WeatherDashboard.tsx
│   ├── context/
│   │   └── WeatherContext.tsx
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # Entry point
│   ├── theme.ts             # Chakra UI theme
│   └── index.css            # Global styles
├── .env                      # Environment variables (gitignored)
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📝 License

[MIT](LICENSE)

## 👨‍💻 Author

- [Pallav Praveen](https://github.com/pallavpraveen)

---

Made with ❤️ and React
