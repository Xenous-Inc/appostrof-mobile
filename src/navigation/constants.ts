export const Stacks = {
    AUTH: 'AUTH_STACK' as const,
    MAIN: 'MAIN_STACK' as const,
    ACCOUNT: 'ACCOUNT_STACK' as const,
};

export const Screens = {
    Auth: {
        WELCOME: 'AUTH_WELCOME_SCREEN' as const,
        SIGN_IN: 'AUTH_SIGN_IN_SCREEN' as const,
        SIGN_UP: 'AUTH_SIGN_UP_SCREEN' as const,
    },
    Main: {
        STORY: 'MAIN_STORY_SCREEN' as const,
    },
    Account: {
        PROFILE: 'ACCOUNT_PROFILE_SCREEN' as const,
        SETTINGS: 'ACCOUNT_SETTINGS_SCREEN' as const,
        INTERESTS: 'ACCOUNT_INTERESTS_SCREEN' as const,
    },
};
