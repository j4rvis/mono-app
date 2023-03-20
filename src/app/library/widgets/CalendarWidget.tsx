import { calendar_v3, google, Auth } from 'googleapis';
// https://github.com/googleapis/google-api-nodejs-client/blob/main/src/apis/calendar/v3.ts
// Tutorial https://www.geeksforgeeks.org/how-to-integrate-google-calendar-in-node-js/
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;

const TIME_FORMAT = new Intl.DateTimeFormat('de-DE', {
  hour: "numeric",
  minute: "2-digit"
});

const DAY_FORMAT = new Intl.DateTimeFormat('de-DE', {
  dateStyle: 'medium'
});

export default async function CalendarWidget({calendarId}: {calendarId: string}) {
  let dateToday = new Date();
  dateToday.setHours(0);
  dateToday.setMinutes(0);
  dateToday.setSeconds(0);
  
  const jwtClient: Auth.JWT = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    undefined,
    GOOGLE_PRIVATE_KEY,
    SCOPES
  );

  const calendar: calendar_v3.Calendar = google.calendar({
    version: 'v3'
  });

  const res: { data: calendar_v3.Schema$Events } = await calendar.events.list({
    calendarId: calendarId,
    timeMin: dateToday.toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
    auth: jwtClient,
  });

  if(!res || !res.data || !res.data.items ) return (
    <div>Something went wrong with the Calendar</div>
  );

  return(
    <div>
      {res.data.items.map((e:calendar_v3.Schema$Event) => {
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