export interface ApiError {
  message?: string;
  error?: string;
  status?: number;
  details?: unknown;
}
