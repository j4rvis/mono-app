import { getData } from "./CalendarFetcher";
import { calendar_v3 } from 'googleapis';

const TIME_FORMAT = new Intl.DateTimeFormat('de-DE', {
  hour: "numeric",
  minute: "2-digit"
});

const DAY_FORMAT = new Intl.DateTimeFormat('de-DE', {
  dateStyle: 'medium'
});

export default async function CalendarWidget({calendarId}: {calendarId: string}) {
  const data: { data: calendar_v3.Schema$Events} = await getData(calendarId);
  if ( !data || !data.data || !data.data.items) return (
    <div>Something went wrong!</div>
  );
  return(
    <div>
      {data.data.items.map((e:calendar_v3.Schema$Event) => {
        return(
          <div key={e.id}>
            { e.start?.dateTime ?
              <>
                {TIME_FORMAT.format(new Date(e.start?.dateTime as string))}
                {TIME_FORMAT.format(new Date(e.end?.dateTime as string))}
              </>
              : <div>Fullday</div>
            }
            {e.summary}
          </div>
        )
      })}
    </div>
  )
}