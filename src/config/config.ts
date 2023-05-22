interface Config {
  apiUrl: string;
  jwtSecret: string;
  spaceAccessKeyId: string;
  spaceSecrectKey: string;
  spaceEndPoint: string;
  databaseUrl: string;
  databaseUserName: string;
  databasePassword: string;
  databaseName: string;
}
export const config: Config = {
  jwtSecret: process.env.JWT_SECRET || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY || "",
  spaceSecrectKey: process.env.SPACE_SECRECT_KEY || "",
  spaceEndPoint: process.env.SPACE_ENDPOINT || "",
  databaseName: process.env.DATABASE_NAME || "",
  databaseUserName: process.env.DATABASE_USERNAME || "",
  databasePassword: process.env.DATABASE_PASSWORD || "",
  databaseUrl: process.env.DATABASE_URL || "",
  apiUrl: process.env.NEXT_PUBLIC_SERVER_BASEURL || "",
};
