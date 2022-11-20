import { consoleTransport, logger } from 'xenous-logs';

const config = {
    transport: consoleTransport,
    severity: __DEV__ ? 'debug' : 'error',
    levels: {
        info: 6,
        error: 3,
        // dev levels
        warn: 2,
        debug: 1,
    },
    transportOptions: {
        colors: 'ansi',
    },
    enabledExtensions: ['ui', 'hooks', 'redux', 'api', 'middlewares', 'utils', 'storage'] as const,
    async: true,
    dateFormat: __DEV__ ? 'time' : 'utc',
    printLevel: true,
    printDate: true,
    enabled: true,
};

const logs = logger.createLogger<typeof config.levels, typeof config.enabledExtensions[number]>(config);

export default logs;
