import "server-only";
import { readWiseAuthSettings } from "./wise-id";
export const wiseAuth = readWiseAuthSettings({
  AUTH_URL: process.env.AUTH_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
  WISE_AUTH_ISSUER: process.env.WISE_AUTH_ISSUER,
  WISE_AUTH_DISCOVERY_URL: process.env.WISE_AUTH_DISCOVERY_URL,
  WISE_AUTH_CLIENT_ID: process.env.WISE_AUTH_CLIENT_ID,
  WISE_AUTH_CLIENT_SECRET: process.env.WISE_AUTH_CLIENT_SECRET,
  WISE_AUTH_SCOPE: process.env.WISE_AUTH_SCOPE,
});
