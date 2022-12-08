import React from 'react';
import AppNavigator from '@navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import store from './store';

export default function App() {
    const [fontsLoaded] = useFonts({
        OpenSans_SemiBold: require('@assets/fonts/OpenSans_SemiBold.ttf'),
        OpenSans_Regular: require('@assets/fonts/OpenSans_Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <AppNavigator />
            </SafeAreaProvider>
        </Provider>
    );
}
