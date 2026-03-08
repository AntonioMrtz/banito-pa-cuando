export {
  type OpenMeteoForecastDTO,
  type OpenMeteoHourlyUnitsDTO,
  type OpenMeteoHourlyDataDTO,
  OpenMeteoForecastSchema,
};

import { z } from "zod";

interface OpenMeteoForecastDTO {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: OpenMeteoHourlyUnitsDTO;
  hourly: OpenMeteoHourlyDataDTO;
}

interface OpenMeteoHourlyUnitsDTO {
  time: string;
  apparent_temperature: string;
  precipitation: string;
  windspeed_10m: string;
  wind_gusts_10m: string;
}

interface OpenMeteoHourlyDataDTO {
  time: string[];
  apparent_temperature: number[];
  precipitation: number[];
  windspeed_10m: number[];
  wind_gusts_10m: number[];
}

const OpenMeteoHourlyUnitsSchema: z.ZodType<OpenMeteoHourlyUnitsDTO> = z.object(
  {
    time: z.string(),
    apparent_temperature: z.string(),
    precipitation: z.string(),
    windspeed_10m: z.string(),
    wind_gusts_10m: z.string(),
  },
);

const OpenMeteoHourlyDataSchema: z.ZodType<OpenMeteoHourlyDataDTO> = z.object({
  time: z.array(z.string()),
  apparent_temperature: z.array(z.number()),
  precipitation: z.array(z.number()),
  windspeed_10m: z.array(z.number()),
  wind_gusts_10m: z.array(z.number()),
});

const OpenMeteoForecastSchema: z.ZodType<OpenMeteoForecastDTO> = z.object({
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
