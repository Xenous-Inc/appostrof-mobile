import React, { ReactElement } from 'react';
import {
    Image,
    ImageSourcePropType,
    ImageStyle,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import colors from '@styles/colors';
import sizes from '@styles/sizes';

export interface IIcon {
    title?: string;
    icon?: ReactElement;
    source?: ImageSourcePropType;
    imageStyle?: StyleProp<ImageStyle>;
    textStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
}

const Icon: React.FC<IIcon> = props => {
    const { title, icon, source, imageStyle, textStyle, containerStyle } = props;

    return (
        <View style={[styles.content, !!title && styles.content_state_title, containerStyle]}>
            {icon ? icon : source ? <Image source={source} style={imageStyle} /> : null}
            {title && (
                <Text style={[styles.content__text, textStyle]} selectable={false}>
                    {title}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
    },
    content_state_title: {
        padding: 2,
    },
    content__text: {
        backgroundColor: colors.TRANSPARENT,
        fontSize: sizes.TEXT_LITTLE,
        textAlign: 'center',
    },
});

export default Icon;
