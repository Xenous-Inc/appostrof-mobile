import { StyleSheet, View, Image, Text } from 'react-native';
import React from 'react';

export default function StoryScreen() {
    return (
        <View style={styles.background}>
            <AppBar />
            <Cover />
            <Grade />
        </View>
    );
}

function AppBar() {
    return (
        <View style={stylesAppBar.app_bar}>
            <Text style={stylesAppBar.app_bar_text}>Appostraf</Text>
            <View style={stylesAppBar.icons_container}>
                <Image style={stylesAppBar.logo} source={require('../../images/user_icon.png')} />
                <Image style={stylesAppBar.settings} source={require('../../images/settings.png')} />
            </View>
        </View>
    );
}

function Cover() {
    return <Image style={stylesCover.cover} source={require('../../images/cover.png')} />;
}

function Grade() {
    return (
        <View style={stylesGrade.stars_container}>
            <Image style={stylesGrade.star} source={require('../../images/fill_star.png')} />
            <Image style={stylesGrade.star} source={require('../../images/fill_star.png')} />
            <Image style={stylesGrade.star} source={require('../../images/fill_star.png')} />
            <Image style={stylesGrade.star} source={require('../../images/fill_star.png')} />
            <Image style={stylesGrade.star} source={require('../../images/empty_star.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%',
        backgroundColor: 'softwhite',
        paddingTop: 48,
        paddingRight: 25,
        paddingLeft: 35,
    },
});

const stylesAppBar = StyleSheet.create({
    app_bar: {
        width: '100%',
        height: '5%',
        justifyContent: 'space-between',
        flexDirection: 'row',
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
        fontFamily: 'SemiBold',
    },
    icons_container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

const stylesCover = StyleSheet.create({
    cover: {
        alignSelf: 'flex-end',
        height: '40%',
        width: '100%',
        borderRadius: 40,
        marginTop: 40,
    },
});

const stylesGrade = StyleSheet.create({
    stars_container: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    star: {
        height: 24.64,
        width: 25.32,
        marginHorizontal: 4,
        marginTop: 25,
    },
});
