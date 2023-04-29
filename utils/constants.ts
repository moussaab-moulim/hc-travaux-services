enum EnvVariableName {
  EMAIL_PASSWORD,
  NEXT_PUBLIC_EMAIL_RECIEVER,
  NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_SITE_DOAMIN,
  NEXT_PUBLIC_EMAIL_USER,
  INSTAGRAM_API,
  NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
  NEXT_PUBLIC_SEARCH_CONSOLE,
  NEXT_PUBLIC_SITE_URL,
}
export const getRequiredEnvVariable = (
  envVar: string,
  key: keyof typeof EnvVariableName
) => {
  if (!envVar) {
    throw new Error(`Required env variable not set: ${key}`);
  }
  return envVar;
};
