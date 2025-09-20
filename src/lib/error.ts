// Centralized error handling utilities

export class AppError extends Error {
    constructor(message: string, public statusCode?: number) {
        super(message);
        this.name = 'AppError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }
    }
}

export function handleError(error: unknown): string {
    if (error instanceof AppError) {
        return error.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unknown error occurred.';
}
