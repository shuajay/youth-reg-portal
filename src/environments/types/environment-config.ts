// environment-config.ts
export interface EnvironmentConfig {
  production: boolean,
  env: string,
  JWT_TOKEN_KEY: string,
  JWT_REFRESH_TOKEN_KEY: string,
  auth_url: {
    api: string,
    auth_base: string,
  };
  url:{
    api: string,
  }
}