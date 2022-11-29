import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Stacks } from './constants';
import AuthStack, { AuthStackParams } from './stacks/AuthStack';
import StoryStack, { StoryStackParams } from './stacks/StoryStack';
import AccountStack, { AccountStackParams } from './stacks/AccountStack';

export type AppStackParams = {
    [Stacks.AUTH]: NavigatorScreenParams<AuthStackParams>;
    [Stacks.STORY]: NavigatorScreenParams<StoryStackParams>;
    [Stacks.ACCOUNT]: NavigatorScreenParams<AccountStackParams>;
};

const Stack = createStackNavigator<AppStackParams>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Stacks.AUTH}>
                <Stack.Screen key={Stacks.AUTH} name={Stacks.AUTH} component={AuthStack} />
                <Stack.Screen key={Stacks.STORY} name={Stacks.STORY} component={StoryStack} />
                <Stack.Screen key={Stacks.ACCOUNT} name={Stacks.ACCOUNT} component={AccountStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
