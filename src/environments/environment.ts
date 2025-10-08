// environment.ts
import { sharedConfig } from "./shared-config";
import { EnvironmentConfig } from "./types/environment-config";

export const environment: EnvironmentConfig = {
    production: false,
    ...sharedConfig,
    env: 'dev',
    auth_url: {
        api: 'http://localhost:8080',
        auth_base: '/api/auth'
    },
    url:{
        api: 'http://localhost:8080',
    }
    
};