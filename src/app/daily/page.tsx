import Sheet from "@/app/library/components/Sheet";
import SheetElement from "@/app/library/components/SheetElement";
import TodaysCalendarWidget from "../library/widgets/calendar/TodaysCalendarWidget";
import NextEventsCalendarWidget from "../library/widgets/calendar/NextEventsCalendarWidget";
import DateWidget from "../library/widgets/DateWidget";
import TodoistWidget from "../library/widgets/TodoistWidget";
import DailyWeatherWidget from "../library/widgets/weather/DailyWeatherWidget";
import WeeklyWeatherWidget from "../library/widgets/weather/WeeklyWeatherWidget";
import { headers } from 'next/headers';

export const revalidate = 60;

export default function Home() {
  // Force SSR
  const headersList = headers();
  return (
    <div className="bg-slate-200">
      <Sheet className="grid-cols-8 grid-rows-6">
        <SheetElement className="col-span-3 row-span-1">
          <DateWidget/>
        </SheetElement>
        <SheetElement className="col-span-5 row-span-1">
          {/* @ts-expect-error Async Server Component */}
          <DailyWeatherWidget />
        </SheetElement>
        <SheetElement className="col-span-3 row-span-2" title="Routinen">
          {/* @ts-expect-error Async Server Component */}
          <TodoistWidget projectId="2309857533"/>
        </SheetElement>
        <SheetElement className="col-span-3 row-span-2" title="Mein Kalender">
          {/* @ts-expect-error Async Server Component */}
          <NextEventsCalendarWidget calendarId="schwarzm90@gmail.com" numberEvents={10}/>
        </SheetElement>
        <SheetElement className="col-span-2 row-span-6 text-center" title="Vorhersage">
          {/* @ts-expect-error Async Server Component */}
          <WeeklyWeatherWidget />
        </SheetElement>
        <SheetElement className="col-span-2 row-span-2" title="Freunde und Familie">
          {/* @ts-expect-error Async Server Component */}
          <TodoistWidget projectId="2309857416"/>
        </SheetElement>
        <SheetElement className="col-span-4 row-span-3" title="Arbeitstag">
          {/* @ts-expect-error Async Server Component */}
          <TodaysCalendarWidget calendarId="5ss33m63d2br1hh51p53bo74v0@group.calendar.google.com"/>
        </SheetElement>
      </Sheet>
    </div>
  )
}
