import React from 'react';
import StoryScreen from './screens/story_screen';
import { useFonts } from 'expo-font';

export default function App() {
    const [fontsLoaded] = useFonts({
        OpenSans_SemiBold: require('@assets/fonts/SemiBold.ttf'),
        OpenSans_Regular: require('@assets/fonts/Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }
    return <StoryScreen />;
}
