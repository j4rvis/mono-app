import { calendar_v3, google, Auth } from 'googleapis';
import { CalendarEvents } from '../models/calendar';
// https://github.com/googleapis/google-api-nodejs-client/blob/main/src/apis/calendar/v3.ts
// Tutorial https://www.geeksforgeeks.org/how-to-integrate-google-calendar-in-node-js/
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;

let dateStartToday = new Date();
dateStartToday.setHours(0);
dateStartToday.setMinutes(0);
dateStartToday.setSeconds(0);

let dateEndToday = new Date();
dateEndToday.setHours(23);
dateEndToday.setMinutes(59);
dateEndToday.setSeconds(59);

const jwtClient: Auth.JWT = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  undefined,
  GOOGLE_PRIVATE_KEY,
  SCOPES
);

const calendar: calendar_v3.Calendar = google.calendar({
  version: 'v3'
});

export async function getNextCalendarEvents(calendarId: string, numberEvents: number) {
  const data: { data: CalendarEvents} = await calendar.events.list({
    calendarId: calendarId,
    timeMin: dateStartToday.toISOString(),
    // timeMax: dateEndToday.toISOString(),
    maxResults: numberEvents || 3,
    singleEvents: true,
    orderBy: 'startTime',
    auth: jwtClient,
  });
  if ( !data || !data.data || !data.data.items) return {
    error: true,
    events: undefined
  };
  return {
    error: false,
    events: data.data
  }
}

export async function getTodaysCalendarEvents(calendarId: string) {
  const data: { data: CalendarEvents} = await calendar.events.list({
    calendarId: calendarId,
    timeMin: dateStartToday.toISOString(),
    timeMax: dateEndToday.toISOString(),
    // maxResults: 20,
    singleEvents: true,
    orderBy: 'startTime',
    auth: jwtClient,
  });
  if ( !data || !data.data || !data.data.items) return {
    error: true,
    events: undefined
  };
  return {
    error: false,
    events: data.data
  }
}