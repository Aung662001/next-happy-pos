interface Config {
  backofficeUrl: string;
  orderUrl: string;
  authUrl: string;
  jwtSecret: string;
  spaceAccessKeyId: string;
  spaceSecrectKey: string;
  spaceEndPoint: string;
  databaseUrl: string;
  databaseUserName: string;
  databasePassword: string;
  databaseName: string;
  clientId: string;
  clientSecret: string;
  nextAuthSecret: string;
}
export const config: Config = {
  jwtSecret: process.env.JWT_SECRET || "",
  authUrl: process.env.NEXTAUTH_URL || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY || "",
  spaceSecrectKey: process.env.SPACE_SECRECT_KEY || "",
  spaceEndPoint: process.env.SPACE_ENDPOINT || "",
  databaseName: process.env.DATABASE_NAME || "",
  databaseUserName: process.env.DATABASE_USERNAME || "",
  databasePassword: process.env.DATABASE_PASSWORD || "",
  databaseUrl: process.env.DATABASE_URL || "",
  backofficeUrl: process.env.NEXT_PUBLIC_BACKOFFICE_BASEURL || "",
  orderUrl: process.env.NEXT_PUBLIC_ORDER_BASEURL || "",
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  nextAuthSecret: process.env.NEXTAUTH_SECRET || "",
};
