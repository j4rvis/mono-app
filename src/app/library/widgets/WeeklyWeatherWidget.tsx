import Image from "next/image";

const API_KEY=process.env.WEATHER_API_KEY;
const TIME_FORMAT = new Intl.DateTimeFormat('de-DE', {
  weekday: "short"
});

async function getData(): Promise<WeatherApiResponse> {
  const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Berlin&days=7&aqi=no&alerts=no`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
export default async function WeeklyWeatherWidget({ className }: { className?: string }) {
  const data: WeatherApiResponse = await getData();
  return (
    <div className={`${className} flex flex-col justify-evenly h-full`}>
      {data.forecast.forecastday.map((forecastday) => {
        return (
          <div key={forecastday.date_epoch} className="flex flex-row justify-around w-full">
            <div className="flex flex-col justify-center">
              <span className="text-xl font-bold text-center">{TIME_FORMAT.format(new Date(forecastday.date))}</span>
              <div className="flex flex-row items-center gap-1">
                <span className="text-base font-bold text-center">{Math.round(forecastday.day.maxtemp_c)}°C</span>
                <span className="text-sm text-gray-800 text-center">({Math.round(forecastday.day.mintemp_c)})</span>
              </div>
            </div>
            <Image className="w-16 self-center" width={40} height={40} src={`https:${forecastday.day.condition.icon}`} alt={forecastday.day.condition.text} />
          </div>
        )
      })}
    </div>
  )
}