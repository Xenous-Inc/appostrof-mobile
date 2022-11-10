import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '@components/atoms/button';
import Center from '@components/atoms/center';
import Space from '@components/atoms/space';

export default function App() {
    return (
        <Center>
            <Button title={'Цветная кнопка'} mode={Button.Mode.Contained} />
            <Space mode={Space.Mode.Horizontal} size={16} />
            <Button
                title={'Цветная кастомная кнопка'}
                color={'coral'}
                backgroundColor={'pink'}
                mode={Button.Mode.Contained}
            />
            <Space mode={Space.Mode.Horizontal} size={16} />
            <Button title={'Назад'} mode={Button.Mode.Blank} />
            <Space mode={Space.Mode.Horizontal} size={16} />
            <Button
                title={'Кастомный назад'}
                borderColor={'red'}
                containerStyle={{ borderWidth: 1 }}
                backgroundColor={'red'}
                mode={Button.Mode.Blank}
            />
        </Center>
    );
}
