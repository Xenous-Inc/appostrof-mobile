import React from 'react';
import { Screens } from '../constants';
import { createStackNavigator } from '@react-navigation/stack';

export type StoryStackParams = {
    [Screens.Story.MAIN]: undefined;
};

const Stack = createStackNavigator<StoryStackParams>();

// TODO fill with Screen
const StoryStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName={Screens.Story.MAIN}>
            {/*<Stack.Screen key={Screens.Story.MAIN} name={Screens.Story.MAIN} component={StoryScreen} />*/}
        </Stack.Navigator>
    );
};

export default StoryStack;
