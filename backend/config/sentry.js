import * as Sentry from "@sentry/node";

export const initSentry = () => {
  if (!process.env.SENTRY_DSN) {
    console.log("Sentry DSN not set — skipping Sentry init");
    return;
  }
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  });
  console.log("Sentry initialized");
};

export default Sentry;
