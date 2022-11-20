import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const AppBar = () => {
    return (
        <View style={styles.app_bar}>
            <Text style={styles.app_bar_text}>Appostraf</Text>
            <View style={styles.icons_container}>
                <Image style={styles.logo} source={require('@assets/icons/user.png')} />
                <Image style={styles.settings} source={require('@assets/icons/settings.png')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    app_bar: {
        width: '100%',
        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 34,
        height: 34,
        marginRight: 25,
    },
    settings: {
        width: 26,
        height: 16,
    },
    app_bar_text: {
        fontSize: 27,
        fontFamily: 'OpenSans_SemiBold',
    },
    icons_container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default AppBar;
