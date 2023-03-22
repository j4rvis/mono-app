import Image from "next/image";
import { getWeatherForecast } from "../../fetcher/getWeatherForecast";

const TIME_FORMAT = new Intl.DateTimeFormat('de-DE', {
  hour: "numeric",
  minute: "numeric"
});

export default async function DailyWeatherWidget({ className }: { className?: string }) {
  const data: WeatherApiResponse = await getWeatherForecast();
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