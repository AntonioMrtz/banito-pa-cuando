export { SUPPORTED_COUNTRIES, type SupportedCountry };

// Supported countries
const SUPPORTED_COUNTRIES = ["ES"] as const;

type SupportedCountry = (typeof SUPPORTED_COUNTRIES)[number];
