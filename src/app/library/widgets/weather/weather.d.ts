interface WeatherApiResponse {
  location: {
    name: string,
    region: string,
    country: string,
    lat: number,
    lon: number,
    tz_id: string,
    localtime_epoch: number,
    localtime: string
  },
  current: {
    last_updated_epoch: number,
    last_updated: string,
    temp_c: number,
    is_day: number,
    condition: {
      text: string,
      icon: string,
      code: number,
    },
    feelslike_c: number,
    uv: number
  },
  forecast: {
    forecastday: [
      {
        date: string,
        date_epoch: number,
        day: {
          maxtemp_c: number,
          mintemp_c: number,
          totalsnow_cm: number,
          daily_will_it_rain: number,
          daily_chance_of_rain: number,
          daily_will_it_snow: number,
          daily_chance_of_snow: number,
          condition: {
            text: string,
            icon: string,
            code: number
          }
        },
        astro: {
          is_moon_up: number,
          is_sun_up: number
        },
        hour: [
          {
            time_epoch: number,
            time: string,
            temp_c: number,
            is_day: number,
            condition: {
              text: string,
              icon: string,
              code: number,
            },
            feelslike_c: number,
            will_it_rain: number,
            chance_of_rain: number,
            will_it_snow: number,
            chance_of_snow: number
          },
        ]
      }
    ]
  }
}