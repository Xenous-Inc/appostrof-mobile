import colors from '@styles/colors';
import sizes from '@styles/sizes';
import { darkenColor, setAlpha } from '@utils/colors';
import React, { ReactElement, useMemo } from 'react';
import {
    GestureResponderEvent,
    Image,
    ImageSourcePropType,
    ImageStyle,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { IIcon } from '@components/atoms/Icon';

enum Mode {
    Contained = 'contained',
    Blank = 'blank',
}

export interface IIconButton {
    mode?: Mode;
    title?: string;
    icon?: ReactElement;
    source?: ImageSourcePropType;
    imageStyle?: StyleProp<ImageStyle>;
    color?: string;
    borderColor?: string;
    backgroundColor?: string;
    disabled?: boolean;
    textStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    onPress?(event: GestureResponderEvent): void;
    onLongPress?(event: GestureResponderEvent): void;
}

const IconButton: React.FC<IIconButton> & { Mode: typeof Mode } = props => {
    const {
        mode = Mode.Blank,
        title,
        icon,
        source,
        imageStyle,
        color = colors.TEXT_PRIMARY,
        backgroundColor = colors.BLUE,
        borderColor = colors.BLUE,
        disabled,
        textStyle,
        containerStyle,
        onPress,
        onLongPress,
    } = props;

    const isPressed = useSharedValue(false);
    const inactiveBackgroundColor = useMemo<string>(
        () => setAlpha(backgroundColor, mode === Mode.Blank ? 0 : 1),
        [mode, backgroundColor],
    );
    const activeBackgroundColor = useMemo<string>(
        () => setAlpha(darkenColor(backgroundColor), mode === Mode.Blank ? 0.16 : 1),
        [mode, backgroundColor],
    );
    const animatedStyle = useAnimatedStyle(() => ({
        backgroundColor: withSpring(isPressed.value ? activeBackgroundColor : inactiveBackgroundColor, {
            damping: 5,
            mass: 0.5,
        }),
    }));

    return (
        <Animated.View
            style={[
                styles.wrapper,
                containerStyle,
                styles.wrapper_property_padding,
                disabled && styles.wrapper_state_disabled,
                { borderColor },
                animatedStyle,
            ]}
        >
            <Pressable
                style={[
                    styles.wrapper__content,
                    !!title && styles.wrapper__content_state_title,
                    // todo: merge and apply incoming paddings
                    !!StyleSheet.flatten(containerStyle)?.width && { width: '100%' },
                    !!StyleSheet.flatten(containerStyle)?.height && { height: '100%' },
                ]}
                onPress={onPress ?? onPress}
                onLongPress={onLongPress ?? onLongPress}
                onPressIn={() => {
                    isPressed.value = true;
                }}
                onPressOut={() => {
                    isPressed.value = false;
                }}
                disabled={disabled}
            >
                {icon ? icon : source ? <Image source={source} style={imageStyle} /> : null}
                {title && (
                    <Text style={[styles.content__text, textStyle, { color }]} selectable={false}>
                        {title}
                    </Text>
                )}
            </Pressable>
        </Animated.View>
    );
};
IconButton.Mode = Mode;

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 24,
        aspectRatio: 1,
    },
    wrapper_property_padding: {
        padding: 0,
        paddingStart: 0,
        paddingLeft: 0,
        paddingTop: 0,
        paddingEnd: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    wrapper_state_disabled: {
        opacity: 0.56,
    },
    wrapper__content: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        aspectRatio: 1,
    },
    wrapper__content_state_title: {
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    content__text: {
        backgroundColor: colors.TRANSPARENT,
        fontSize: sizes.TEXT_LITTLE,
        textAlign: 'center',
    },
});

export default IconButton;
