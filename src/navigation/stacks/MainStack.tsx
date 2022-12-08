import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StoryScreen from '@screens/StoryScreen';
import { Screens } from '../constants';

export type MainStackParams = {
    [Screens.Main.STORY]: undefined;
};

const Stack = createStackNavigator<MainStackParams>();

const MainStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName={Screens.Main.STORY} screenOptions={{ headerShown: false }}>
            <Stack.Screen key={Screens.Main.STORY} name={Screens.Main.STORY} component={StoryScreen} />
        </Stack.Navigator>
    );
};

export default MainStack;
