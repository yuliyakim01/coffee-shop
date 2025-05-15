import type { ApiError } from '@/data/interfaces';

export default function handleApiError(error: unknown): string {
  if (error instanceof Error && !('statusCode' in error)) {
    return `Error: ${error.message}`;
  }

  if (isApiError(error)) {
    const { message, errors } = error;

    if (Array.isArray(errors) && errors.length > 0) {
      return `${errors[0].code}: ${message}`;
    }

    if (message) {
      return `Error: ${message}`;
    }
  }

  return 'An unexpected error occurred. Please try again later.';
}
function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'message' in error;
}
