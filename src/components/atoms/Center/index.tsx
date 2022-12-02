import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const Center: React.FC<ViewProps> = props => {
    return (
        <View {...props} style={[styles.content, props.style]}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Center;
