import React from 'react';
import StoryScreen from './screens/story_screen';
import { useFonts } from 'expo-font';

export default function App() {
    const [loaded] = useFonts({
        SemiBold: require('./assets/fonts/SemiBold.ttf'),
        Regular: require('./assets/fonts/Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }
    return <StoryScreen />;
}
