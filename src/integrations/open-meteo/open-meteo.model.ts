export {
  type OpenMeteoForecastDTO,
  type OpenMeteoHourlyUnitsDTO,
  type OpenMeteoHourlyDataDTO,
  OpenMeteoForecastSchema,
};

import { z } from "zod";

const OpenMeteoHourlyUnitsSchema = z.object({
  time: z.string(),
  apparent_temperature: z.string(),
  precipitation: z.string(),
  windspeed_10m: z.string(),
  wind_gusts_10m: z.string(),
});

const OpenMeteoHourlyDataSchema = z.object({
  time: z.array(z.string()),
  apparent_temperature: z.array(z.number()),
  precipitation: z.array(z.number()),
  windspeed_10m: z.array(z.number()),
  wind_gusts_10m: z.array(z.number()),
});

const OpenMeteoForecastSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),
  hourly_units: OpenMeteoHourlyUnitsSchema,
  hourly: OpenMeteoHourlyDataSchema,
});

type OpenMeteoHourlyUnitsDTO = z.infer<typeof OpenMeteoHourlyUnitsSchema>;
type OpenMeteoHourlyDataDTO = z.infer<typeof OpenMeteoHourlyDataSchema>;
type OpenMeteoForecastDTO = z.infer<typeof OpenMeteoForecastSchema>;
