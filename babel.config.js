module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@assets': './src/assets',
                        '@components': './src/components',
                        '@styles': './src/styles',
                        '@utils': './src/utils',
                        '@models': './src/models',
                        '@api': './src/api',
                        '@navigation': './src/navigation',
                    },
                },
            ],
            'react-native-reanimated/plugin',
        ],
    };
};
