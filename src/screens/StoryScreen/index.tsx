import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, Image, LayoutChangeEvent, ScrollViewProps, StyleSheet, Text, View, ViewProps } from 'react-native';
import colors from '@styles/colors';
import AppBar from '@components/molecules/AppBar';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParams } from '@navigation/stacks/MainStack';
import { Screens } from '@navigation/constants';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedProps,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Space from '@components/atoms/Space';
import Grades from '@components/molecules/Grades';
import sizes from '@styles/sizes';
import Icon from '@components/atoms/Icon';
import IconButton from '@components/atoms/IconButton';
import SkeletonLoader from 'expo-skeleton-loader';
import { LoaderItemStyle } from 'expo-skeleton-loader/lib/Constants';
import durations from '@styles/durations';
import { StatusBar } from 'expo-status-bar';

const DATA =
    'Отец мой Андрей Петрович Гринев в молодости своей служил при графе Минихе и вышел в ' +
    'отставку премьер-майором в 17.. году. С тех пор жил он в своей Симбирской деревне, где и женился' +
    'на девице Авдотье Васильевне Ю., дочери бедного тамошнего дворянина. Нас было девять человек' +
    'детей. Все мои братья и сестры умерли во младенчестве. Матушка была еще мною брюхата, как уже я' +
    'был записан в Семеновский полк сержантом, по милости майора гвардии князя В., близкого нашего' +
    'родственника. Если бы паче всякого чаяния матушка родила дочь, то батюшка объявил бы куда' +
    'следовало о смерти неявившегося сержанта, и дело тем бы и кончилось. Я считался в отпуску до' +
    'окончания наук. В то время воспитывались мы не по-нонешнему. С пятилетнего возраста отдан я был' +
    'на руки стремянному Савельичу, за трезвое поведение пожалованному мне в дядьки. Под его надзором' +
    'на двенадцатом году выучился я русской грамоте и мог очень здраво судить о свойствах борзого' +
    'кобеля. В это время батюшка нанял для меня француза, мосье Бопре, которого выписали из Москвы' +
    'вместе с годовым запасом вина и прованского масла. Приезд его сильно не понравился Савельичу.' +
    '«Слава богу, — ворчал он про себя, — кажется, дитя умыт, причесан, накормлен. Куда как нужно\n' +
    'тратить лишние деньги и...' +
    'Отец мой Андрей Петрович Гринев в молодости своей служил при графе Минихе и вышел в ' +
    'отставку премьер-майором в 17.. году. С тех пор жил он в своей Симбирской деревне, где и женился' +
    'на девице Авдотье Васильевне Ю., дочери бедного тамошнего дворянина. Нас было девять человек' +
    'детей. Все мои братья и сестры умерли во младенчестве. Матушка была еще мною брюхата, как уже я' +
    'был записан в Семеновский полк сержантом, по милости майора гвардии князя В., близкого нашего' +
    'родственника. Если бы паче всякого чаяния матушка родила дочь, то батюшка объявил бы куда' +
    'следовало о смерти неявившегося сержанта, и дело тем бы и кончилось. Я считался в отпуску до' +
    'окончания наук. В то время воспитывались мы не по-нонешнему. С пятилетнего возраста отдан я был' +
    'на руки стремянному Савельичу, за трезвое поведение пожалованному мне в дядьки. Под его надзором' +
    'на двенадцатом году выучился я русской грамоте и мог очень здраво судить о свойствах борзого' +
    'кобеля. В это время батюшка нанял для меня француза, мосье Бопре, которого выписали из Москвы' +
    'вместе с годовым запасом вина и прованского масла. Приезд его сильно не понравился Савельичу.' +
    '«Слава богу, — ворчал он про себя, — кажется, дитя умыт, причесан, накормлен. Куда как нужно\n' +
    'тратить лишние деньги и';

const StoryScreen: React.FC<StackScreenProps<MainStackParams, typeof Screens.Main.STORY>> = () => {
    // window safe area height
    const insets = useSafeAreaInsets();
    const windowHeight = useMemo(() => Dimensions.get('screen').height - insets.top - insets.bottom, [insets]);
    const windowWidth = useMemo(() => Dimensions.get('screen').width - insets.left - insets.right, [insets]);

    // defines height in pixels, is used to track scroll progress
    const [storyTextHeight, setStoryTextHeight] = useState(0);
    // defines shift in pixels, is used to translate story view to make animated transition
    const [shortStoryTextShiftBottom, setShortStoryTextShiftBottom] = useState(0);
    // defines shift in pixels, is used to translate progress bar to make animated transition
    const [bookIconShiftRight, setBookIconShiftRight] = useState(0);
    const [bookIconShiftTop, setBookIconShiftTop] = useState(0);
    // defines number of symbols from story showed in short story block
    const [shortStoryLength, setShortStoryLength] = useState(0);
    // defines number of lines from story showed in short story block
    const [shortStoryLines, setShortStoryLines] = useState(0);

    const scrollViewRef = useRef<Animated.ScrollView>(null);

    // defines progress of collapsing: from 0 to 1
    const collapseProgress = useSharedValue(0);
    // defines progress of scrolling: from 0 to 1
    const scrollProgress = useSharedValue(0);
    // defines progress of measuring short story layout: 0 or 1
    const isShortStoryMeasured = useSharedValue(false);

    // disable paging after cover collapse
    const scrollViewAnimatedProps = useAnimatedProps<ScrollViewProps>(
        () => ({
            pagingEnabled: collapseProgress.value <= 0.98,
        }),
        [],
    );

    // disable story text pointer events while cover is not collapsed
    const storyTextAnimatedProps = useAnimatedProps<ViewProps>(
        () => ({
            pointerEvents: collapseProgress.value <= 0.98 ? 'none' : 'auto',
        }),
        [],
    );

    const handleScrollAnimated = useAnimatedScrollHandler(
        event => {
            collapseProgress.value = Math.min(event.contentOffset.y / windowHeight, 1);
            scrollProgress.value = Math.max((event.contentOffset.y - windowHeight) / storyTextHeight, 0);
        },
        [windowHeight, storyTextHeight],
    );

    // handle layout update of book icon view and update necessary values
    const handleBookIconlayout = useCallback(
        (event: LayoutChangeEvent) =>
            event.target.measure((_x, _y, width, height, pageX, pageY) => {
                setBookIconShiftRight(windowWidth - insets.left - insets.right - pageX - width / 2);
                setBookIconShiftTop(pageY - insets.top + height / 3.5);
            }),
        [windowWidth, insets.top, insets.right, insets.left],
    );

    // handle layout update of short story view and update necessary values
    const handleShortStoryLayout = useCallback(
        (event: LayoutChangeEvent) =>
            event.target.measure((_x, _y, width, height, _pageX, pageY) => {
                setShortStoryTextShiftBottom(
                    windowHeight + insets.top + insets.bottom - pageY + styles.content__story.paddingTop,
                );
                setShortStoryLength(Math.ceil((width * height * 1.5) / styles.shortStory__text.fontSize ** 2));
                setShortStoryLines(Math.floor(height / (styles.shortStory__text.fontSize * 1.2)));
                isShortStoryMeasured.value = true;
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [windowHeight, insets.top, insets.bottom],
    );

    // handle layout update of full story view and update necessary values
    const handleStoryLayout = useCallback(
        (event: LayoutChangeEvent) =>
            event.target.measure((_x, _y, _width, height, _pageX, _pageY) => setStoryTextHeight(height)),
        [],
    );

    // opacity: show bar after cover collapse
    const barAnimatedStyle = useAnimatedStyle(() => {
        const width = interpolate(
            collapseProgress.value,
            [1 / 3, 1],
            [0, windowWidth - styles.wrapper__progress.marginHorizontal * 2],
            Extrapolation.CLAMP,
        );
        const opacity = interpolate(collapseProgress.value, [16 / 48, 17 / 48], [0, 1], Extrapolation.CLAMP);
        const borderRadius = interpolate(
            collapseProgress.value,
            [1 / 3, 1],
            [styles.wrapper__progress.borderRadius, 0],
            Extrapolation.CLAMP,
        );
        const translateX = interpolate(
            collapseProgress.value,
            [0, 1],
            [-1 * bookIconShiftRight, 0],
            Extrapolation.CLAMP,
        );
        const translateY = interpolate(
            collapseProgress.value,
            [0, 1 / 3, 1],
            [bookIconShiftTop, bookIconShiftTop - shortStoryTextShiftBottom, 0].map(shift => shift + insets.top),
            Extrapolation.CLAMP,
        );

        return {
            width,
            opacity,
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            transform: [{ translateX }, { translateY }],
        };
    }, [bookIconShiftTop, bookIconShiftRight, shortStoryTextShiftBottom, insets.top]);

    // transform: translate author view during the animated transition
    const authorAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            collapseProgress.value,
            [0, 1],
            [0, shortStoryTextShiftBottom / 4],
            Extrapolation.CLAMP,
        );

        return { transform: [{ translateY }] };
    }, [shortStoryTextShiftBottom]);

    // transform: translate book icon view during the animated transition
    const bookIconAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(collapseProgress.value, [16 / 48, 17 / 48], [1, 0], Extrapolation.CLAMP);
        const translateY = interpolate(
            collapseProgress.value,
            [0, 1],
            [0, shortStoryTextShiftBottom],
            Extrapolation.CLAMP,
        );
        const scale = interpolate(collapseProgress.value, [0, 0.5], [1, 0], Extrapolation.CLAMP);

        return { opacity, transform: [{ translateY }, { scale }] };
    }, [shortStoryTextShiftBottom]);

    // opacity: hide short story loader after it was measured
    const shortStoryLoaderAnimatedStyle = useAnimatedStyle(
        () => ({ opacity: withTiming(isShortStoryMeasured.value ? 0 : 1, { duration: durations.SHORT }) }),
        [],
    );

    // opacity: hide short story text during the animated transition / show short story text after it was measured
    // transform: translate short story view during the animated transition
    const shortStoryTextAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            collapseProgress.value,
            [0, 1],
            [0, shortStoryTextShiftBottom],
            Extrapolation.CLAMP,
        );
        const opacity =
            collapseProgress.value > 0
                ? interpolate(collapseProgress.value, [0, 1], [1, 0], Extrapolation.CLAMP)
                : withTiming(isShortStoryMeasured.value ? 1 : 0, { duration: durations.SHORT });

        return { opacity, transform: [{ translateY }] };
    }, [shortStoryTextShiftBottom]);

    // opacity: hide arrow during the animated transition
    // transform: translate arrow view during the animated transition
    const arrowAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(collapseProgress.value, [0, 0.2], [1, 0], Extrapolation.CLAMP);
        const translateY = interpolate(
            collapseProgress.value,
            [0, 1],
            [0, shortStoryTextShiftBottom * 2],
            Extrapolation.CLAMP,
        );

        return { opacity, transform: [{ translateY }] };
    }, [shortStoryTextShiftBottom]);

    // opacity: show story during the animated transition
    // transform: translate story view during the animated transition
    const storyTextAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            collapseProgress.value,
            [1, 0],
            [0, -1 * shortStoryTextShiftBottom],
            Extrapolation.CLAMP,
        );

        return { opacity: collapseProgress.value, transform: [{ translateY }] };
    }, [shortStoryTextShiftBottom]);

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={colors.BLACK} style={'light'} />
            <Animated.View style={[styles.wrapper__progress, barAnimatedStyle]}>
                <View />
            </Animated.View>
            <Animated.ScrollView
                style={styles.wrapper__content}
                animatedProps={scrollViewAnimatedProps}
                showsVerticalScrollIndicator={false}
                onScroll={handleScrollAnimated}
                ref={scrollViewRef}
            >
                <>
                    <View style={[styles.content__cover, { height: windowHeight }]}>
                        <AppBar />

                        <Space mode={'vertical'} size={16} />

                        <View style={styles.cover__imageWrapper}>
                            <Image style={styles.imageWrapper__image} source={require('@assets/images/cover.png')} />
                        </View>

                        <Space mode={'vertical'} size={16} />

                        <Grades rating={5} />

                        <Space mode={'vertical'} size={16} />

                        <View style={styles.cover__info}>
                            <View style={styles.info__row}>
                                <Text style={styles.row__title}>A Guide to the Good Life</Text>
                                <Icon
                                    source={require('@assets/icons/clock.png')}
                                    containerStyle={styles.row_icon_clock}
                                    imageStyle={styles.row__icon}
                                    title={'1h 12m'}
                                />
                            </View>
                            <Space mode={'vertical'} size={2} />
                            <View style={styles.info__row}>
                                <Animated.Text style={[styles.row__author, authorAnimatedStyle]}>
                                    Автор: William B.
                                </Animated.Text>
                                <IconButton
                                    containerStyle={bookIconAnimatedStyle}
                                    source={require('@assets/icons/book.png')}
                                    imageStyle={styles.row__icon}
                                    title={'12%'}
                                    onLayout={handleBookIconlayout}
                                />
                            </View>
                        </View>

                        <Space mode={'vertical'} size={4} />

                        <View style={styles.cover__shortStory}>
                            <Animated.View style={[styles.shortStory__loader, shortStoryLoaderAnimatedStyle]}>
                                <SkeletonLoader
                                    style={styles.shortStory__loader}
                                    boneColor={colors.SOFT_WHITE}
                                    highlightColor={colors.SKELETON}
                                >
                                    <SkeletonLoader.Item style={{} as LoaderItemStyle} />
                                </SkeletonLoader>
                            </Animated.View>
                            <Animated.Text
                                style={[styles.shortStory__text, shortStoryTextAnimatedStyle]}
                                onLayout={handleShortStoryLayout}
                                numberOfLines={shortStoryLines}
                                ellipsizeMode={'tail'}
                                textBreakStrategy={'balanced'}
                            >
                                {DATA.slice(0, shortStoryLength)}
                            </Animated.Text>
                        </View>

                        <IconButton
                            containerStyle={[styles.cover__arrow, arrowAnimatedStyle]}
                            icon={<Image source={require('@assets/icons/arrow.png')} style={styles.arrow__icon} />}
                            onPress={() => scrollViewRef.current.scrollTo({ y: windowHeight })}
                        />
                    </View>

                    <Animated.View
                        style={[styles.content__story, storyTextAnimatedStyle]}
                        // pointerEvents={isCoverCollapsed ? 'auto' : 'none'}
                        animatedProps={storyTextAnimatedProps}
                        onLayout={handleStoryLayout}
                    >
                        <Text style={styles.story_text} textBreakStrategy={'balanced'} selectable={true}>
                            {DATA}
                        </Text>
                    </Animated.View>
                </>
            </Animated.ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper__content: { backgroundColor: colors.SOFT_WHITE },
    wrapper__progress: {
        position: 'absolute',
        marginHorizontal: 12,
        right: 0,
        borderRadius: 20,
        backgroundColor: colors.PROGRESS,
        height: 8,
        zIndex: 1000,
    },
    content__cover: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 20,
    },
    cover__imageWrapper: {
        alignSelf: 'stretch',
        aspectRatio: 1,
    },
    imageWrapper__image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    cover__info: {
        alignSelf: 'stretch',
    },
    cover__shortStory: {
        flex: 1,
        alignSelf: 'stretch',
    },
    shortStory__loader: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    shortStory__text: {
        height: '100%',
        width: '100%',
        fontSize: sizes.TEXT_MEDIUM,
        fontFamily: 'OpenSans_Regular',
    },
    info__row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    row__title: {
        fontSize: sizes.TEXT_LARGE,
        color: colors.TEXT_PRIMARY,
        fontFamily: 'OpenSans_Regular',
    },
    row__author: {
        fontSize: sizes.TEXT_SMALL,
        color: colors.TEXT_PRIMARY,
        fontFamily: 'OpenSans_Regular',
    },
    row__icon: {
        width: 24,
        height: 24,
        aspectRatio: 1,
    },
    row_icon_clock: {
        marginRight: 2,
    },
    cover__arrow: {
        alignSelf: 'center',
    },
    arrow__icon: {
        width: 32,
        resizeMode: 'contain',
    },
    content__story: {
        paddingHorizontal: 20,
        paddingTop: 28,
    },
    story_text: {
        fontSize: sizes.TEXT_MEDIUM,
        fontFamily: 'OpenSans_Regular',
        width: '100%',
    },
});

export default StoryScreen;
