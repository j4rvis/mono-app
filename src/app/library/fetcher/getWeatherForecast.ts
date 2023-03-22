const API_KEY=process.env.WEATHER_API_KEY;
const DAY_FORMAT = new Intl.DateTimeFormat("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"})

export async function getWeatherForecast(): Promise<WeatherApiResponse> {
  const today = DAY_FORMAT.format(new Date());
  const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Berlin&days=7&aqi=no&alerts=no&random=${today}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}