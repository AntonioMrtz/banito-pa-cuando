export {
  type OpenMeteoForecastDTO,
  type OpenMeteoHourlyUnitsDTO,
  type OpenMeteoHourlyDataDTO,
};

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
}

interface OpenMeteoHourlyDataDTO {
  time: string[];
  apparent_temperature: number[];
  precipitation: number[];
  windspeed_10m: number[];
}
