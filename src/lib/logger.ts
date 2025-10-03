type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, any>;
  error?: Error;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context,
      error,
    };

    this.logs.push(entry);

    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console output with appropriate method
    const consoleMessage = `[${level.toUpperCase()}] ${message}`;
    const extraData = [context, error?.stack].filter(Boolean);

    switch (level) {
      case "error":
        console.error(consoleMessage, ...extraData);
        break;
      case "warn":
        console.warn(consoleMessage, ...extraData);
        break;
      case "debug":
        console.debug(consoleMessage, ...extraData);
        break;
      default:
        console.log(consoleMessage, ...extraData);
    }

    // In production, you might want to send errors to a service like Sentry
    if (level === "error" && typeof window !== "undefined") {
      // Example: Send to external logging service
      // this.sendToExternalService(entry);
    }
  }

  info(message: string, context?: Record<string, any>) {
    this.log("info", message, context);
  }

  warn(message: string, context?: Record<string, any>) {
    this.log("warn", message, context);
  }

  error(message: string, error?: Error, context?: Record<string, any>) {
    this.log("error", message, context, error);
  }

  debug(message: string, context?: Record<string, any>) {
    this.log("debug", message, context);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }

  // Send to external service (placeholder)
  private sendToExternalService(entry: LogEntry) {
    // Implement sending to services like Sentry, LogRocket, etc.
    // Example:
    // fetch('/api/logs', {
    //   method: 'POST',
    //   body: JSON.stringify(entry)
    // });
  }
}

export const logger = new Logger();

// Error boundary helper
export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = "AppError";
    logger.error(message, this, context);
  }
}

// API error handler
export async function handleApiError(error: unknown): Promise<never> {
  if (error instanceof AppError) {
    throw error;
  }

  if (error instanceof Error) {
    logger.error("API Error", error);
    throw new AppError(error.message, "API_ERROR", 500);
  }

  logger.error("Unknown error", undefined, { error });
  throw new AppError("An unexpected error occurred", "UNKNOWN_ERROR", 500);
}
