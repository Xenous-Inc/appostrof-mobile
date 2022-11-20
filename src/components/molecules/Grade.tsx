import { Image, StyleSheet, View } from 'react-native';
import React from 'react';

const Grade = () => {
    return (
        <View style={styles.stars_container}>
            <Image style={styles.star} source={require('@assets/icons/star_fill.png')} />
            <Image style={styles.star} source={require('@assets/icons/star_fill.png')} />
            <Image style={styles.star} source={require('@assets/icons/star_fill.png')} />
            <Image style={styles.star} source={require('@assets/icons/star_fill.png')} />
            <Image style={styles.star} source={require('@assets/icons/star_empty.png')} />
        </View>
    );
};

const styles = StyleSheet.create({
    stars_container: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 30,
    },
    star: {
        height: 24.64,
        width: 25.32,
        marginHorizontal: 4,
    },
});

export default Grade;
