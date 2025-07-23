import sharedConfig from '../../../shared/config.json' with { type: 'json' };

export const config = {
    ...sharedConfig,
    SERVER_PORT: 8080  // Server-specific configuration
};
