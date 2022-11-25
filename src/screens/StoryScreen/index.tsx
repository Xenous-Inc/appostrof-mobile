import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Image, LayoutChangeEvent, ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '@styles/colors';
import AppBar from '@components/molecules/AppBar';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParams } from '@navigation/stacks/MainStack';
import { Screens } from '@navigation/constants';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStory } from './hooks';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Space from '@components/atoms/Space';
import Grades from '@components/molecules/Grades';
import sizes from '@styles/sizes';
import Icon from '@components/atoms/Icon';
import IconButton from '@components/atoms/IconButton';
import SkeletonLoader from 'expo-skeleton-loader';
import { LoaderItemStyle } from 'expo-skeleton-loader/lib/Constants';
import durations from '@styles/durations';
import * as Progress from 'react-native-progress';
import logs from '@utils/logs';

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

const StoryScreen: React.FC<StackScreenProps<MainStackParams, typeof Screens.Main.STORY>> = props => {
    const { story, isLoading } = useStory();

    // window safe area height
    const insets = useSafeAreaInsets();
    const windowHeight = useMemo(() => Dimensions.get('screen').height - insets.top - insets.bottom, [insets]);

    // defines shift in pixels, is used to translate story view to make animated transition
    const [storyTextShift, setStoryTextShift] = useState(0);
    // defines shift in pixels, is used to translate progress bar to make animated transition
    const [bookIconShift, setBookIconShift] = useState(0);
    // defines number of symbols from story showed in short story block
    const [shortStoryLength, setShortStoryLength] = useState(0);
    // defines number of lines from story showed in short story block
    const [shortStoryLines, setShortStoryLines] = useState(0);
    // defines collapse state, is used to manage scrollview snaps
    const [isCoverCollapsed, setIsCoverCollapsed] = useState(false);

    const scrollViewRef = useRef<ScrollView>(null);

    // defines progress of collapsing: from 0 to 1
    const collapseProgress = useSharedValue(0);
    // defines progress of measuring short story layout: 0 or 1
    const shortStoryMeasureProgress = useSharedValue(0);

    // handle scroll and update values of cover collapsing
    const handleScroll = useCallback(
        ({ nativeEvent }) => {
            collapseProgress.value = Math.min(nativeEvent.contentOffset.y / windowHeight, 1);
            setIsCoverCollapsed(collapseProgress.value > 0.98);
        },
        [windowHeight],
    );
    // handle layout update of book icon view and update necessary values
    const handleBookIconLayout = useCallback(
        (event: LayoutChangeEvent) =>
            event.target.measure((x, y, width, height, pageX, pageY) => {
                setBookIconShift(y + pageY + height / 3);
            }),
        [windowHeight, insets],
    );
    // handle layout update of short story view and update necessary values
    const handleShortStoryLayout = useCallback(
        (event: LayoutChangeEvent) =>
            event.target.measure((x, y, width, height, pageX, pageY) => {
                setStoryTextShift(
                    windowHeight + insets.top + insets.bottom - y - pageY + styles.content__story.paddingTop,
                );
                setShortStoryLength(Math.ceil((width * height * 1.5) / styles.shortStory__text.fontSize ** 2));
                setShortStoryLines(Math.floor(height / (styles.shortStory__text.fontSize * 1.2)));
                shortStoryMeasureProgress.value = 1;
            }),
        [windowHeight, insets],
    );

    const progressBarAnimatedStyle = useAnimatedStyle(
        () => ({
            transform: [{ translateY: bookIconShift * (1 - collapseProgress.value) }],
        }),
        [bookIconShift],
    );
    // transform: translate author view during the animated transition
    const authorAnimatedStyle = useAnimatedStyle(
        () => ({
            transform: [{ translateY: (storyTextShift * collapseProgress.value) / 3 }],
        }),
        [storyTextShift],
    );
    // transform: translate book icon view during the animated transition
    const bookIconAnimatedStyle = useAnimatedStyle(
        () => ({
            transform: [{ translateY: storyTextShift * collapseProgress.value }],
        }),
        [storyTextShift],
    );
    // opacity: hide short story loader after it was measured
    const shortStoryLoaderAnimatedStyle = useAnimatedStyle(
        () => ({
            opacity: withTiming(1 - shortStoryMeasureProgress.value, { duration: durations.SHORT }),
        }),
        [],
    );
    // opacity: hide short story text during the animated transition / show short story text after it was measured
    // transform: translate short story view during the animated transition
    const shortStoryTextAnimatedStyle = useAnimatedStyle(
        () => ({
            opacity: collapseProgress.value
                ? 1 - collapseProgress.value
                : withTiming(shortStoryMeasureProgress.value, { duration: durations.SHORT }),
            transform: [{ translateY: storyTextShift * collapseProgress.value }],
        }),
        [storyTextShift],
    );
    // opacity: hide arrow during the animated transition
    // transform: translate arrow view during the animated transition
    const arrowAnimatedStyle = useAnimatedStyle(
        () => ({
            opacity: Math.max(1 - collapseProgress.value * 5, 0),
            transform: [{ translateY: storyTextShift * collapseProgress.value * 2 }],
        }),
        [storyTextShift],
    );
    // opacity: show story during the animated transition
    // transform: translate story view during the animated transition
    const storyTextAnimatedStyle = useAnimatedStyle(
        () => ({
            opacity: collapseProgress.value,
            transform: [{ translateY: -1 * storyTextShift * (1 - collapseProgress.value) }],
        }),
        [storyTextShift],
    );

    return (
        <SafeAreaView>
            <Animated.View style={[styles.wrapper__progress, { marginTop: insets.top }, progressBarAnimatedStyle]}>
                <Progress.Bar />
            </Animated.View>
            <ScrollView
                style={styles.wrapper__content}
                decelerationRate={isCoverCollapsed ? 'normal' : 0.6}
                snapToInterval={isCoverCollapsed ? undefined : windowHeight}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                ref={scrollViewRef}
            >
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
                                onLayout={handleBookIconLayout}
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
                    pointerEvents={isCoverCollapsed ? 'auto' : 'none'}
                >
                    <Text
                        style={{
                            fontSize: sizes.TEXT_MEDIUM,
                            fontFamily: 'OpenSans_Regular',
                            width: '100%',
                        }}
                        textBreakStrategy={'balanced'}
                        selectable={true}
                    >
                        {DATA}
                    </Text>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper__progress: {
        position: 'absolute',
        zIndex: 1000,
    },
    wrapper__content: { backgroundColor: colors.SOFT_WHITE },
    content__cover: { flexDirection: 'column', alignItems: 'flex-start', padding: 20 },
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
});

/*const StoryScreen_ = () => {
    const [padding, setPadding] = useState(0);
    const [contentOffset, setContentOffset] = useState(0);
    const [widthProgressBar, setWidthProgressBar] = useState(40);
    const [widthBookIcon, setWidthBookIcon] = useState(23.25);
    const [heightBookIcon, setHeightBookIcon] = useState(21.25);
    const [opacityProgressBar, setOpacityProgressBar] = useState(0);
    const [progress, setProgress] = useState(0);
    const [progressNum, setProgressNum] = useState(0);
    const [fontSize, setFontSize] = useState(18);

    return (
        <View style={styles.background}>
            <ScrollView
                stickyHeaderIndices={[4]}
                showsVerticalScrollIndicator={false}
                onScroll={event => {
                    if (event.nativeEvent.contentOffset.y > contentOffset && padding < 60) {
                        setPadding(event.nativeEvent.contentOffset.y / 10);
                        setOpacityProgressBar(padding / 60);
                    } else if (
                        event.nativeEvent.contentOffset.y < contentOffset &&
                        padding > 0 &&
                        event.nativeEvent.contentOffset.y < 700
                    ) {
                        setPadding(event.nativeEvent.contentOffset.y / 10);
                        setOpacityProgressBar(padding / 60);
                    }
                    if (
                        Dimensions.get('screen').width * (event.nativeEvent.contentOffset.y / 900) + 40 <
                            Dimensions.get('screen').width - 70 &&
                        widthProgressBar <= Dimensions.get('screen').width - 70
                    ) {
                        setWidthProgressBar(
                            Dimensions.get('screen').width * (event.nativeEvent.contentOffset.y / 900) + 40,
                        );
                        setWidthBookIcon(1200 / widthProgressBar);
                        setHeightBookIcon(1100 / widthProgressBar);
                        setFontSize(600 / widthProgressBar);
                    } else if (
                        Dimensions.get('screen').width * (event.nativeEvent.contentOffset.y / 900) + 40 >
                        Dimensions.get('screen').width - 70
                    ) {
                        setWidthProgressBar(Dimensions.get('screen').width - 70);
                    }
                    setProgress(
                        (event.nativeEvent.contentOffset.y + Dimensions.get('window').height) /
                            event.nativeEvent.contentSize.height,
                    );
                    if (
                        (event.nativeEvent.contentOffset.y + Dimensions.get('window').height) /
                            event.nativeEvent.contentSize.height >
                        progressNum
                    ) {
                        setProgressNum(
                            (event.nativeEvent.contentOffset.y + Dimensions.get('window').height) /
                                event.nativeEvent.contentSize.height,
                        );
                    }
                    setContentOffset(event.nativeEvent.contentOffset.y);
                }}
            >
                <AppBar />
                <Image style={stylesCover.cover} source={require('@assets/images/cover.png')} />
                <Grade />
                <View style={(stylesStoryInfo.story_container, { paddingBottom: padding })}>
                    <View style={stylesStoryInfo.story_info_name_progress_container}>
                        <Text style={stylesStoryInfo.story_name_text}>A Guide to the Good Life</Text>
                        <View style={stylesStoryInfo.read_time_container}>
                            <Image style={stylesStoryInfo.image_clock} source={require('@assets/icons/clock.png')} />
                            <Text style={stylesStoryInfo.read_time_text}>1h 12m</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={stylesStoryInfo.story_author_text}>Автор: William B.</Text>
                    </View>
                </View>
                <View style={stylesProgressBar.position_progress_bar_container}>
                    <View style={(stylesProgressBar.progress_bar_container, { width: widthProgressBar })}>
                        <Progress.Bar
                            style={{ opacity: opacityProgressBar, position: 'absolute' }}
                            progress={progress}
                            width={widthProgressBar}
                            color={'palevioletred'}
                        />
                        <View style={{ opacity: 1 - opacityProgressBar * 2 }}>
                            <Image
                                style={{
                                    height: heightBookIcon,
                                    width: widthBookIcon,
                                }}
                                source={require('@assets/icons/book.png')}
                            />
                        </View>
                    </View>
                </View>
                <View style={stylesProgressBarText.text_container}>
                    <Text
                        style={
                            (stylesProgressBarText.text_progress,
                            { fontSize: fontSize, opacity: 1 - opacityProgressBar * 2 })
                        }
                    >
                        {(parseFloat(progressNum.toFixed(3)) * 100).toFixed(0)}%
                    </Text>
                </View>
                <View>
                    <View style={{ opacity: 1 - opacityProgressBar * 2, position: 'absolute' }}>
                        <Text style={stylesStoryText.text}>
                            Отец мой Андрей Петрович Гринев в молодости своей служил при графе Минихе и вышел в
                            отставкупремьер-майором в 17.. году...
                        </Text>
                    </View>
                    <View style={{ opacity: opacityProgressBar }}>
                        <Text style={stylesStoryText.text}>
                            Отец мой Андрей Петрович Гринев в молодости своей служил при графе Минихе и вышел в
                            отставкупремьер-майором в 17.. году. С тех пор жил он в своей Симбирской деревне, где и
                            женился на девице Авдотье Васильевне Ю., дочери бедного тамошнего дворянина. Нас было девять
                            человек детей. Все мои братья и сестры умерли во младенчестве. Матушка была еще мною
                            брюхата, как уже я был записан в Семеновский полк сержантом, по милости майора гвардии князя
                            В., близкого нашего родственника. Если бы паче всякого чаяния матушка родила дочь, то
                            батюшка объявил бы куда следовало о смерти неявившегося сержанта, и дело тем бы и кончилось.
                            Я считался в отпуску до окончания наук. В то время воспитывались мы не по-нонешнему. С
                            пятилетнего возраста отдан я был на руки стремянному Савельичу, за трезвое поведение
                            пожалованному мне в дядьки. Под его надзором на двенадцатом году выучился я русской грамоте
                            и мог очень здраво судить о свойствах борзого кобеля. В это время батюшка нанял для меня
                            француза, мосье Бопре, которого выписали из Москвы вместе с годовым запасом вина и
                            прованского масла. Приезд его сильно не понравился Савельичу. «Слава богу, — ворчал он про
                            себя, — кажется, дитя умыт, причесан, накормлен. Куда как нужно тратить лишние деньги и
                            нанимать мусье, как будто и своих людей не стало!» Бопре в отечестве своем был парикмахером,
                            потом в Пруссии солдатом, потом приехал в Россию pour etre outchitel 1, не очень понимая
                            значение этого слова. Он был добрый малый, но ветрен и беспутен до крайности. Главною его
                            слабостию была страсть к прекрасному полу; нередко за свои нежности получал он толчки, от
                            которых охал по целым суткам. К тому же не был он (по его выражению) и врагом бутылки, т. е.
                            (говоря по-русски) любил хлебнуть лишнее. Но как вино подавалось у нас только за обедом, и
                            то по рюмочке, причем учителя обыкновенно и обносили, то мой Бопре очень скоро привык к
                            русской настойке и даже стал предпочитать ее винам своего отечества, как не в пример более
                            полезную для желудка. Мы тотчас поладили, и хотя по контракту обязан он был учить меня
                            по-французски, по-немецки и всем наукам, но он предпочел наскоро выучиться от меня кое-как
                            болтать по-русски, — и потом каждый из нас занимался уже своим делом. Мы жили душа в душу.
                            Другого ментора я и не желал. Но вскоре судьба нас разлучила, и вот по какому случаю: Прачка
                            Палашка, толстая и рябая девка, и кривая коровница Акулька как-то Отец мой Андрей Петрович
                            Гринев в молодости своей служил при графе Минихе и вышел в отставкупремьер-майором в 17..
                            году. С тех пор жил он в своей Симбирской деревне, где и женился на девице Авдотье
                            Васильевне Ю., дочери бедного тамошнего дворянина. Нас было девять человек детей. Все мои
                            братья и сестры умерли во младенчестве. Матушка была еще мною брюхата, как уже я был записан
                            в Семеновский полк сержантом, по милости майора гвардии князя В., близкого нашего
                            родственника. Если бы паче всякого чаяния матушка родила дочь, то батюшка объявил бы куда
                            следовало о смерти неявившегося сержанта, и дело тем бы и кончилось. Я считался в отпуску до
                            окончания наук. В то время воспитывались мы не по-нонешнему. С пятилетнего возраста отдан я
                            был на руки стремянному Савельичу, за трезвое поведение пожалованному мне в дядьки. Под его
                            надзором на двенадцатом году выучился я русской грамоте и мог очень здраво судить о
                            свойствах борзого кобеля. В это время батюшка нанял для меня француза, мосье Бопре, которого
                            выписали из Москвы вместе с годовым запасом вина и прованского масла. Приезд его сильно не
                            понравился Савельичу. «Слава богу, — ворчал он про себя, — кажется, дитя умыт, причесан,
                            накормлен. Куда как нужно тратить лишние деньги и нанимать мусье, как будто и своих людей не
                            стало!» Бопре в отечестве своем был парикмахером, потом в Пруссии солдатом, потом приехал в
                            Россию pour etre outchitel 1, не очень понимая значение этого слова. Он был добрый малый, но
                            ветрен и беспутен до крайности. Главною его слабостию была страсть к прекрасному полу;
                            нередко за свои нежности получал он толчки, от которых охал по целым суткам. К тому же не
                            был он (по его выражению) и врагом бутылки, т. е. (говоря по-русски) любил хлебнуть лишнее.
                            Но как вино подавалось у нас только за обедом, и то по рюмочке, причем учителя обыкновенно и
                            обносили, то мой Бопре очень скоро привык к русской настойке и даже стал предпочитать ее
                            винам своего отечества, как не в пример более полезную для желудка. Мы тотчас поладили, и
                            хотя по контракту обязан он был учить меня по-французски, по-немецки и всем наукам, но он
                            предпочел наскоро выучиться от меня кое-как болтать по-русски, — и потом каждый из нас
                            занимался уже своим делом. Мы жили душа в душу. Другого ментора я и не желал. Но вскоре
                            судьба нас разлучила, и вот по какому случаю: Прачка Палашка, толстая и рябая девка, и
                            кривая коровница Акулька как-то Петрович Гринев в молодости своей служил при графе Минихе и
                            вышел в отставкупремьер-майором в 17.. году. С тех пор жил он в своей Симбирской деревне,
                            где и женился на девице Авдотье Васильевне Ю., тамошнего дворянина. Нас было девять человек
                            детей. Все мои братья и сестры умерли во младенчестве. Матушка была еще мною брюхата, как
                            уже я был записан в Семеновский полк сержантом, по нашего родственника. Если бы паче всякого
                            чаяния матушка родила дочь, то родила дочь, то батюшка то батюшка объявил бы куда следовало
                            о смерти неявившегося сержанта, и дело тем бы и кончилось. Я считался в считался в отпуску
                            до окончания наук. В то время воспитывались мы не по-нонешнему. С пятилетнего пятилетнего
                            возраста отдан я был на руки стремянному Савельичу, за трезвое поведение пожалованному мне в
                            дядьки. Под его надзором на двенадцатом году выучился я русской грамоте и мог очень здраво
                            борзого кобеля. В это время батюшка нанял для меня француза, мосье Бопре, которого выписали
                            из Москвы вместе с годовым запасом вина и прованского масла. Приезд его сильно не понравился
                            Савельичу. «Слава богу, — ворчал он про себя, — кажется, дитя умыт, причесан, накормлен.
                            Куда как нужно тратить нанимать мусье, как будто и своих людей не стало!» Бопре в отечестве
                            своем был парикмахером, потом в потом приехал в outchitel 1, не очень понимая значение этого
                            слова. Он был добрый малый, но ветрен и беспутен до и беспутен до крайности. Главною его
                            слабостию была страсть к была страсть к прекрасному полу; нередко за свои нежности получал
                            он толчки, от которых охал по целым суткам. К тому же не был выражению) и врагом бутылки, т.
                            е. любил хлебнуть лишнее. Но как вино подавалось у нас только за только за обедом, и то по
                            учителя обыкновенно и обносили, то мой Бопре очень скоро привык к русской настойке и даже
                            стал предпочитать ее винам своего отечества, как не в пример более полезную для желудка. Мы
                            тотчас тотчас поладили, и хотя по контракту обязан он был учить меня по-французски,
                            по-немецки и всем наукам, но он предпочел наскоро выучиться от меня кое-как болтать
                            по-русски, — и потом каждый из нас занимался уже своим делом. Мы жили душа в душу. жили душа
                            в душу. Другого ментора я и не желал. Но вскоре судьба нас разлучила, и вот по какому
                            случаю: Прачка Палашка, толстая и рябая девка, и кривая коровница Акулька как-то Отец мой
                            Андрей Петрович Гринев в молодости своей служил при графе Минихе и вышел в
                            отставкупремьер-майором в 17.. году. С тех пор жил он в своей Симбирской деревне, где и
                            женился на девице Авдотье Васильевне Ю., дочери бедного тамошнего дворянина. Нас было девять
                            человек детей. Все мои братья и сестры умерли во младенчестве. Матушка была еще мною
                            брюхата, как уже я был записан в Семеновский полк сержантом, по милости майора гвардии князя
                            В., близкого нашего родственника. Если бы паче всякого чаяния матушка родила дочь, то
                            батюшка объявил бы куда следовало о смерти неявившегося сержанта, и дело тем бы и кончилось.
                            Я считался в отпуску до окончания наук. В то время воспитывались мы не по-нонешнему. С
                            пятилетнего возраста отдан я был на руки стремянному Савельичу, за трезвое поведение
                            пожалованному мне в дядьки. Под его надзором на двенадцатом году выучился я русской грамоте
                            и мог очень здраво судить о свойствах борзого кобеля. В это время батюшка нанял для меня
                            француза, мосье Бопре, которого выписали из Москвы вместе с годовым запасом вина и
                            прованского масла. Приезд его сильно не понравился Савельичу. «Слава богу, — ворчал он про
                            себя, — кажется, дитя умыт, причесан, накормлен. Куда как нужно тратить лишние деньги и
                            нанимать мусье, как будто и своих людей не стало!» Бопре в отечестве своем был парикмахером,
                            потом в Пруссии солдатом, потом приехал в Россию pour etre outchitel 1, не очень понимая
                            значение этого слова. Он был добрый малый, но ветрен и беспутен до крайности. Главною его
                            слабостию была страсть к прекрасному полу; нередко за свои нежности получал он толчки, от
                            которых охал по целым суткам. К тому же не был он (по его выражению) и врагом бутылки, т. е.
                            (говоря т. е. (говоря по-русски) любил хлебнуть лишнее. Но как вино подавалось у нас только
                            за обедом, и то по рюмочке, причем учителя обыкновенно и обносили, то мой Бопре очень скоро
                            привык к русской привык к русской настойке и даже стал предпочитать ее винам своего
                            отечества, как не в пример более полезную для желудка. Мы тотчас поладили, и хотя по
                            контракту обязан он был учить меня по-французски, по-немецки и всем наукам, но он предпочел
                            наскоро выучиться от меня кое-как болтать по-русски, — и потом каждый из нас занимался уже
                            своим делом. Мы жили душа в душу. Другого ментора я и не желал. Но вскоре судьба нас
                            разлучила, и вот по какому случаю: Прачка Палашка, толстая и рябая девка, и кривая коровница
                            Акулька как-то Отец мой Андрей Петрович Гринев в молодости своей служил при графе Минихе и
                            вышел в отставкупремьер-майором в 17.. году. С тех пор жил он в своей Симбирской деревне,
                            где и женился на девице Авдотье Васильевне Ю., дочери бедного тамошнего дворянина. Нас было
                            девять человек детей. Все мои братья и сестры умерли во младенчестве. Матушка была еще мною
                            брюхата, как уже я был записан в Семеновский полк сержантом, по милости майора гвардии князя
                            В., близкого нашего родственника. Если бы паче всякого чаяния матушка родила дочь, то
                            батюшка объявил бы куда следовало о смерти неявившегося сержанта, и дело тем бы и кончилось.
                            Я считался в отпуску до окончания наук. В то время воспитывались мы не по-нонешнему. С
                            пятилетнего возраста отдан я был на руки стремянному Савельичу, за трезвое поведение
                            пожалованному мне в дядьки. Под его надзором на двенадцатом году выучился я русской грамоте
                            и мог очень здраво судить о свойствах борзого кобеля. В это время батюшка нанял для меня
                            француза, мосье Бопре, которого выписали из Москвы вместе с годовым запасом вина и
                            прованского масла. Приезд его сильно не понравился Савельичу. «Слава богу, — ворчал он про
                            себя, — кажется, дитя умыт, причесан, накормлен. Куда как нужно тратить лишние деньги и
                            нанимать мусье, как будто и своих людей не стало!» Бопре в отечестве своем был парикмахером,
                            потом в Пруссии солдатом, потом приехал в Россию pour etre outchitel 1, не очень понимая
                            значение этого слова. Он был добрый малый, но ветрен и беспутен до крайности. Главною его
                            слабостию была страсть к прекрасному полу; нередко за свои нежности получал он толчки, от
                            которых охал по целым суткам. К тому же не был он (по его выражению) и врагом бутылки, т. е.
                            (говоря по-русски) любил хлебнуть лишнее. Но как вино подавалось у нас только за обедом, и
                            то по рюмочке, причем учителя обыкновенно и обносили, то мой Бопре очень скоро привык к
                            русской настойке и даже стал предпочитать ее винам своего отечества, как не в пример более
                            полезную для желудка. Мы тотчас поладили, и хотя по контракту обязан он был учить меня
                            по-французски, по-немецки и всем наукам, но он предпочел наскоро выучиться от меня кое-как
                            болтать по-русски, — и потом каждый из нас занимался уже своим делом. Мы жили душа в душу.
                            Другого ментора я и не желал. Но вскоре судьба нас разлучила, и вот по какому случаю: Прачка
                            Палашка, толстая и рябая девка, и кривая коровница Акулька как-то
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};*/

/*
переписать анимации на Animated
 */

// const styles = StyleSheet.create({
//     background: {
//         height: '100%',
//         width: '100%',
//         backgroundColor: colors.SOFT_WHITE,
//         paddingTop: 50,
//         paddingRight: 25,
//         paddingLeft: 35,
//     },
// });

export default StoryScreen;
