import { getNextCalendarEvents } from "../../fetcher/getCalendarEvents";
import { CalendarEvent, CalendarEvents } from "../../models/calendar";

const DAY_FORMAT = new Intl.DateTimeFormat('de-DE', {
  dateStyle: 'short'
});

export default async function NextEventsCalendarWidget({calendarId, numberEvents}: {calendarId: string, numberEvents: number}) {
  const data: { error:boolean, events:CalendarEvents|undefined } = await getNextCalendarEvents(calendarId, numberEvents);
  if (data.error || !data?.events?.items) return (<div>Something went wrong</div>)
  return(
    <div className="flex gap-2 flex-col">
      {data.events.items.map((e:CalendarEvent) => {
        const dateOfEvent = e.start?.date ? e.start?.date : e.start?.dateTime;
        return(
          <div key={e.id} className="flex gap-2 items-center">
            <div className="text-gray-500 w-16">
              {DAY_FORMAT.format(new Date(dateOfEvent as string))}
            </div>
            <div className="">
              {e.summary}
            </div>
          </div>
        )
      })}
    </div>
  )
}