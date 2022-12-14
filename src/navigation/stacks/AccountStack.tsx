import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../constants';

export type AccountStackParams = {
    [Screens.Account.PROFILE]: undefined;
    [Screens.Account.SETTINGS]: undefined;
    [Screens.Account.INTERESTS]: undefined;
};

const Stack = createStackNavigator<AccountStackParams>();

// TODO: fill with Screens
const AccountStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName={Screens.Account.PROFILE}>
            {/*<Stack.Screen key={Screens.Account.PROFILE} name={Screens.Account.PROFILE} component={ProfileScreen} />*/}
        </Stack.Navigator>
    );
};

export default AccountStack;
