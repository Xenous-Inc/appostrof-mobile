import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../constants';

export type AuthStackParams = {
    [Screens.Auth.WELCOME]: undefined;
    [Screens.Auth.SIGN_UP]: undefined;
    [Screens.Auth.SIGN_IN]: undefined;
};

const Stack = createStackNavigator<AuthStackParams>();

// TODO: fill with Screens
const AuthStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName={Screens.Auth.WELCOME}>
            {/*<Stack.Screen key={Screens.Auth.WELCOME} name={Screens.Auth.WELCOME} component={WelcomeScreen} />*/}
        </Stack.Navigator>
    );
};

export default AuthStack;
