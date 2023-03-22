import { calendar_v3, google, Auth } from 'googleapis';
// https://github.com/googleapis/google-api-nodejs-client/blob/main/src/apis/calendar/v3.ts
// Tutorial https://www.geeksforgeeks.org/how-to-integrate-google-calendar-in-node-js/
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;

export async function getData(calendarId: string) {
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

  return calendar.events.list({
    calendarId: calendarId,
    timeMin: dateToday.toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
    auth: jwtClient,
  });
}