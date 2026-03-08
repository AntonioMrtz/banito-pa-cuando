import { Forecast } from "@/src/features/forecast/forecast.model";
import { OpenMeteoForecastDTO } from "./open-meteo.model";

export { mapForecast };

const mapForecast = (data: OpenMeteoForecastDTO, days: number): Forecast => {
  const forecast: Forecast = {
    days,
    latitude: data.latitude,
    longitude: data.longitude,
    hourlyUnits: {
      apparentTemperature: data.hourly_units.apparent_temperature,
      precipitation: data.hourly_units.precipitation,
      windspeed10m: data.hourly_units.windspeed_10m,
      windgust10m: data.hourly_units.wind_gusts_10m,
    },
    hourlyData: {
      time: data.hourly.time,
      apparentTemperature: data.hourly.apparent_temperature,
      precipitation: data.hourly.precipitation,
      windspeed10m: data.hourly.windspeed_10m,
      windgust10m: data.hourly.wind_gusts_10m,
    },
  };
  return forecast;
};
