// Weather Service: Open-Meteo Integration for Pune & Peak Heatwave Scenario
// Pune Coordinates: 18.5204° N, 73.8567° E

export const PUNE_COORDINATES = {
  latitude: 18.5204,
  longitude: 73.8567,
  city: "Pune",
  state: "Maharashtra",
  elevationM: 560
};

export const PEAK_HEATWAVE_SCENARIO = {
  isSimulated: true,
  scenarioName: "Peak May Severe Heatwave (IMD Red Alert)",
  timestamp: new Date().toISOString(),
  temperatureC: 43.6,
  apparentTemperatureC: 47.8,
  relativeHumidityPct: 34,
  windSpeedKmh: 9.2,
  weatherCode: 0,
  conditionText: "Severe Heatwave Conditions (IMD Red Alert)",
  uvIndex: 11.2,
  heatIndexCategory: "Extreme Danger",
  description: "Simulated scenario modeling a peak May afternoon heatwave over Pune, with solar zenith angle at maximum and hot westerly advection."
};

/**
 * Fetches real-time weather from Open-Meteo for Pune
 */
export async function fetchLivePuneWeather() {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${PUNE_COORDINATES.latitude}&longitude=${PUNE_COORDINATES.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia%2FKolkata`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Open-Meteo HTTP error: ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;

    const weatherCodeText = getWeatherCodeDescription(current.weather_code);

    return {
      isSimulated: false,
      scenarioName: "Live Shivajinagar Weather Station",
      timestamp: current.time,
      temperatureC: Math.round(current.temperature_2m * 10) / 10,
      apparentTemperatureC: Math.round(current.apparent_temperature * 10) / 10,
      relativeHumidityPct: Math.round(current.relative_humidity_2m),
      windSpeedKmh: Math.round(current.wind_speed_10m * 10) / 10,
      weatherCode: current.weather_code,
      conditionText: weatherCodeText,
      uvIndex: 7.5,
      heatIndexCategory: getHeatIndexCategory(current.apparent_temperature),
      description: "Live observations retrieved via Open-Meteo API for Pune coordinates."
    };
  } catch (error) {
    console.warn("Unable to fetch live Open-Meteo data, falling back to simulated scenario:", error);
    return {
      ...PEAK_HEATWAVE_SCENARIO,
      fetchError: true,
      errorMsg: error.message
    };
  }
}

function getWeatherCodeDescription(code) {
  if (code === 0) return "Clear Sky / Intense Sun";
  if (code === 1 || code === 2) return "Mainly Clear / Partly Sunny";
  if (code === 3) return "Overcast";
  if (code >= 45 && code <= 48) return "Hazy / Foggy";
  if (code >= 51 && code <= 67) return "Rain Showers";
  if (code >= 80 && code <= 82) return "Localized Showers";
  return "Clear & Sunny";
}

function getHeatIndexCategory(apparentTemp) {
  if (apparentTemp >= 45) return "Extreme Danger";
  if (apparentTemp >= 39) return "Danger";
  if (apparentTemp >= 32) return "Extreme Caution";
  return "Caution";
}
