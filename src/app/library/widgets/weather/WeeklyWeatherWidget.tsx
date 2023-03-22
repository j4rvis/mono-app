import Image from "next/image";
import { getData } from "./WeatherFetcher";

const WEEKDAY_FORMAT = new Intl.DateTimeFormat('de-DE', {
  weekday: "short"
});

export default async function WeeklyWeatherWidget({ className }: { className?: string }) {
  const data: WeatherApiResponse = await getData();
  return (
    <div className={`${className} flex flex-col justify-evenly h-full`}>
      {data.forecast.forecastday.map((forecastday) => {
        return (
          <div key={forecastday.date_epoch} className="flex flex-row justify-around w-full">
            <div className="flex flex-col justify-center">
              <span className="text-xl font-bold text-center">{WEEKDAY_FORMAT.format(new Date(forecastday.date))}</span>
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