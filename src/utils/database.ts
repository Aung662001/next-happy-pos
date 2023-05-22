import { Pool } from "pg";
import { config } from "../config/config";

export const pool = new Pool({
  user: config.databaseUserName,
  host: config.databaseUrl,
  database: config.databaseName,
  password: config.databasePassword,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 5000,
  max: 20,
});
