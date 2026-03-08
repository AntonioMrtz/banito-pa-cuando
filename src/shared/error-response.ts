export { type AppErrorResponse };

/**
 * Standardized error response format for the application.
 */
interface AppErrorResponse {
  status: number;
  errors: { message: string }[];
}
