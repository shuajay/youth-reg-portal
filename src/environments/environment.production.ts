// environment.production.ts
import { EnvironmentConfig } from "./types/environment-config";
import { sharedConfig } from "./shared-config";

export const environment: EnvironmentConfig = {
    production: true,
    env: 'prod',
    ...sharedConfig,
    auth_url: {
        api: 'https://api.youthreg.com',
        auth_base: '/api/auth'
    },
    url:{
        api: 'https://api.youthreg.com',
    }
}