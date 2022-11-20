import React from 'react';
import { useFonts } from 'expo-font';
import AppNavigator from '@navigation/AppNavigator';

export default function App() {
    const [fontsLoaded] = useFonts({
        OpenSans_SemiBold: require('@assets/fonts/OpenSans_SemiBold.ttf'),
        OpenSans_Regular: require('@assets/fonts/OpenSans_Regular.ttf'),
    });
    
    if (!fontsLoaded) {
        return null;
    }

    return <AppNavigator />;
}
