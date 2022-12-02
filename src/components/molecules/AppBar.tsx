import React from 'react';
import { GestureResponderEvent, Image, StyleSheet, Text, View } from 'react-native';
import strings from '@utils/strings';
import sizes from '@styles/sizes';
import colors from '@styles/colors';
import Space from '@components/atoms/Space';
import IconButton from '@components/atoms/IconButton';

export interface IAppBar {
    onAccountPress?(event: GestureResponderEvent): void;
    onSettingsPress?(event: GestureResponderEvent): void;
}

const AppBar: React.FC<IAppBar> = props => {
    const { onAccountPress, onSettingsPress } = props;

    return (
        <View style={styles.wrapper}>
            <Text style={styles.content__title}>{strings.TITLE}</Text>
            <View style={styles.content__actions}>
                <IconButton
                    icon={
                        <Image
                            style={styles.actions__icon}
                            resizeMode={'contain'}
                            source={require('@assets/icons/user.png')}
                        />
                    }
                    onPress={onAccountPress}
                />
                <Space mode={'horizontal'} size={4} />
                <IconButton
                    icon={
                        <Image
                            style={styles.actions__icon}
                            resizeMode={'contain'}
                            source={require('@assets/icons/settings.png')}
                        />
                    }
                    onPress={onSettingsPress}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    content__title: {
        fontFamily: 'OpenSans_SemiBold',
        fontSize: sizes.TEXT_LARGE,
        color: colors.TEXT_PRIMARY,
    },
    content__actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    actions__icon: {
        width: 32,
        height: 32,
        aspectRatio: 1,
    },
});

export default AppBar;
