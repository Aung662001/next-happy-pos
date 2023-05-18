interface Config {
  apiUrl: string;
}
export const config: Config = {
  apiUrl: process.env.REACT_APP_SERVER_BASEURL || "",
};
