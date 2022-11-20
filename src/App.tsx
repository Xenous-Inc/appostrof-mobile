import React from 'react';
import StoryScreen from './screens/StoryScreen';
import { useFonts } from 'expo-font';

export default function App() {
    const [fontsLoaded] = useFonts({
        OpenSans_SemiBold: require('@assets/fonts/OpenSans_SemiBold.ttf'),
        OpenSans_Regular: require('@assets/fonts/OpenSans_Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }
    return <StoryScreen />;
}
