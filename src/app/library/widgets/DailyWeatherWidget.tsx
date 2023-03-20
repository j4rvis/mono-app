import Image from "next/image";

const API_KEY=process.env.WEATHER_API_KEY;
const TIME_FORMAT = new Intl.DateTimeFormat('de-DE', {
  hour: "numeric",
  minute: "numeric"
});

async function getData(): Promise<WeatherApiResponse> {
  const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Berlin&days=1&aqi=no&alerts=no`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
export default async function DailyWeatherWidget({ className }: { className?: string }) {
  const data: WeatherApiResponse = await getData();
  return (
    <div className={`${className} flex`}>
      {data.forecast.forecastday[0].hour.map((hour, i) => {
        if (i%3 || i<=5) return;
        return (
          <div key={i} className="flex flex-col justify-around w-full">
            <Image className="w-16 self-center" width={40} height={40} src={`https:${hour.condition.icon}`} alt={hour.condition.text} />
            <span className="text-lg font-bold text-center">{Math.round(hour.temp_c)}°C</span>
            <span className="text-sm text-gray-800 text-center">{TIME_FORMAT.format(new Date(hour.time))}</span>
          </div>
        )
      })}
    </div>
  )
}