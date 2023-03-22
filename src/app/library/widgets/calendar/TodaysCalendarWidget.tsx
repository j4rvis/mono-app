import { getTodaysCalendarEvents } from "../../fetcher/getCalendarEvents";
import { CalendarEvent, CalendarEvents } from "../../models/calendar";

const TIME_FORMAT = new Intl.DateTimeFormat('de-DE', {
  hour: "numeric",
  minute: "2-digit"
});

const DAY_FORMAT = new Intl.DateTimeFormat('de-DE', {
  dateStyle: 'medium'
});

export default async function TodaysCalendarWidget({calendarId}: {calendarId: string}) {
  const data: { error:boolean, events:CalendarEvents|undefined }  = await getTodaysCalendarEvents(calendarId);
  if (data.error || !data?.events?.items) return (<div>Something went wrong</div>)
  return(
    <div className="flex gap-2 flex-col">
      {data.events.items.map((e:CalendarEvent) => {
        return(
          <div key={e.id} className="flex gap-2 items-center">
            <div className="text-gray-500 w-10">
              { e.start?.dateTime &&
                <>
                  <p>{TIME_FORMAT.format(new Date(e.start?.dateTime as string))}</p>
                  <p>{TIME_FORMAT.format(new Date(e.end?.dateTime as string))}</p>
                </>
              }
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