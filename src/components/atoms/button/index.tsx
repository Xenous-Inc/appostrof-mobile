import React, { useMemo } from 'react';
import {
    GestureResponderEvent,
    Image,
    ImageSourcePropType,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    ViewStyle,
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Space from '@components/atoms/space';
import sizes from '@styles/sizes';
import { darkenColor, setAlpha } from '@utils/colors';
import colors from '@styles/colors';

enum Mode {
    Contained = 'contained',
    Blank = 'blank',
}

export interface IButton {
    mode?: Mode;
    title: string;
    icon?: ImageSourcePropType;
    iconSize?: number;
    color?: string;
    borderColor?: string;
    backgroundColor?: string;
    disabled?: boolean;
    textStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    onPress?(event: GestureResponderEvent): void;
    onLongPress?(event: GestureResponderEvent): void;
}

const Button: React.FC<IButton> & { Mode: typeof Mode } = props => {
    const {
        mode = Mode.Blank,
        title,
        icon,
        iconSize,
        color = colors.TEXT_PRIMARY,
        backgroundColor = colors.BLUE,
        borderColor = colors.BLUE,
        disabled,
        onPress,
        onLongPress,
    } = props;
    const textStyle = StyleSheet.flatten<TextStyle>(props.textStyle);
    const containerStyle = StyleSheet.flatten<ViewStyle>(props.containerStyle);

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
                    // todo: merge and apply incoming paddings
                    !!containerStyle?.width && { width: '100%' },
                    !!containerStyle?.height && { height: '100%' },
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
                <Text style={[styles.content__text, textStyle, { color }]} selectable={false}>
                    {title}
                </Text>
                {!!title && icon && <Space mode={Space.Mode.Vertical} size={8} />}
                {icon && <Image source={icon} style={[styles.content__icon, !!iconSize && { width: iconSize }]} />}
            </Pressable>
        </Animated.View>
    );
};
Button.Mode = Mode;

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 16,
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    content__text: {
        backgroundColor: colors.TRANSPARENT,
        fontSize: sizes.TEXT_MEDIUM,
        textAlign: 'center',
    },
    content__icon: {
        width: 24,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
});

export default Button;
