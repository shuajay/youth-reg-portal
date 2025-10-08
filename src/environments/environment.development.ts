// environment.development.ts
import { sharedConfig } from "./shared-config";
import { EnvironmentConfig } from "./types/environment-config";

export const environment: EnvironmentConfig = {
  production: false,
  env: 'dev',
    auth_url: {
        api: 'http://localhost:8080',
        auth_base: '/api/auth'
    },
    ...sharedConfig,
    url:{
        api: 'http://localhost:8080',
    }
};