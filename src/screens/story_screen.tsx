import { StyleSheet, View, Image, Text, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';
import * as Progress from 'react-native-progress';
import colors from '@styles/colors';

const StoryScreen = () => {
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
                <Cover />
                <Grade />
                <StoryInfo paddingBottom={padding} />
                <ProgressBar
                    widthProgressBar={widthProgressBar}
                    widthBookIcon={widthBookIcon}
                    heightBookIcon={heightBookIcon}
                    progress={progress}
                    opacityProgressBar={opacityProgressBar}
                />
                <ProgressBarText progressNum={progressNum} fontSize={fontSize} opacityText={opacityProgressBar} />
                <StoryText opacityStoryText={opacityProgressBar} />
            </ScrollView>
        </View>
    );
};

const AppBar = () => {
    return (
        <View style={stylesAppBar.app_bar}>
            <Text style={stylesAppBar.app_bar_text}>Appostraf</Text>
            <View style={stylesAppBar.icons_container}>
                <Image style={stylesAppBar.logo} source={require('../assets/icons/user_icon.png')} />
                <Image style={stylesAppBar.settings} source={require('../assets/icons/settings.png')} />
            </View>
        </View>
    );
};

const Cover = () => {
    return <Image style={stylesCover.cover} source={require('../assets/icons/cover.png')} />;
};

const Grade = () => {
    return (
        <View style={stylesGrade.stars_container}>
            <Image style={stylesGrade.star} source={require('../assets/icons/fill_star.png')} />
            <Image style={stylesGrade.star} source={require('../assets/icons/fill_star.png')} />
            <Image style={stylesGrade.star} source={require('../assets/icons/fill_star.png')} />
            <Image style={stylesGrade.star} source={require('../assets/icons/fill_star.png')} />
            <Image style={stylesGrade.star} source={require('../assets/icons/empty_star.png')} />
        </View>
    );
};

export interface IStoryInfoProp {
    paddingBottom: number;
}

const StoryInfo: React.FC<IStoryInfoProp> = props => {
    const { paddingBottom } = props;
    return (
        <View style={(stylesStoryInfo.story_container, { paddingBottom: paddingBottom })}>
            <View style={stylesStoryInfo.story_info_name_progress_container}>
                <Text style={stylesStoryInfo.story_name_text}>A Guide to the Good Life</Text>
                <View style={stylesStoryInfo.read_time_container}>
                    <Image style={stylesStoryInfo.image_clock} source={require('../assets/icons/clock.png')} />
                    <Text style={stylesStoryInfo.read_time_text}>1h 12m</Text>
                </View>
            </View>
            <View>
                <Text style={stylesStoryInfo.story_author_text}>Автор: William B.</Text>
            </View>
        </View>
    );
};

export interface IProgressBarProp {
    widthProgressBar: number;
    opacityProgressBar: number;
    progress: number;
    heightBookIcon: number;
    widthBookIcon: number;
}

const ProgressBar: React.FC<IProgressBarProp> = props => {
    const { widthProgressBar, opacityProgressBar, progress, heightBookIcon, widthBookIcon } = props;
    return (
        <View style={stylesProgressBar.position_progress_bar_container}>
            <View style={(stylesProgressBar.progress_bar_container, { width: widthProgressBar })}>
                <Progress.Bar
                    style={{ opacity: opacityProgressBar, alignSelf: 'flex-end', position: 'absolute' }}
                    progress={progress}
                    width={widthProgressBar}
                    color={'palevioletred'}
                />
                <View style={(stylesProgressBar.image_container, { opacity: 1 - opacityProgressBar * 2 })}>
                    <Image
                        style={{
                            height: heightBookIcon,
                            width: widthBookIcon,
                        }}
                        source={require('../assets/icons/book.png')}
                    />
                </View>
            </View>
        </View>
    );
};

export interface IProgressBarText {
    progressNum: number;
    fontSize: number;
    opacityText: number;
}

const ProgressBarText: React.FC<IProgressBarText> = props => {
    const { progressNum, fontSize, opacityText } = props;
    return (
        <View style={stylesProgressBarText.text_container}>
            <Text style={(stylesProgressBarText.text_progress, { fontSize: fontSize, opacity: 1 - opacityText * 2 })}>
                {(parseFloat(progressNum.toFixed(3)) * 100).toFixed(0)}%
            </Text>
        </View>
    );
};

export interface IStoryText {
    opacityStoryText: number;
}

const StoryText: React.FC<IStoryText> = props => {
    const { opacityStoryText } = props;
    return (
        <View>
            <View style={{ opacity: 1 - opacityStoryText * 2, position: 'absolute' }}>
                <Text style={stylesStoryText.text}>
                    Отец мой Андрей Петрович Гринев в молодости своей служил при графе Минихе и вышел в
                    отставкупремьер-майором в 17.. году...
                </Text>
            </View>
            <View style={{ opacity: opacityStoryText }}>
                <Text style={stylesStoryText.text}>
                    Отец мой Андрей Петрович Гринев в молодости своей служил при графе Минихе и вышел в
                    отставкупремьер-майором в 17.. году. С тех пор жил он в своей Симбирской деревне, где и женился на
                    девице Авдотье Васильевне Ю., дочери бедного тамошнего дворянина. Нас было девять человек детей. Все
                    мои братья и сестры умерли во младенчестве. Матушка была еще мною брюхата, как уже я был записан в
                    Семеновский полк сержантом, по милости майора гвардии князя В., близкого нашего родственника. Если
                    бы паче всякого чаяния матушка родила дочь, то батюшка объявил бы куда следовало о смерти
                    неявившегося сержанта, и дело тем бы и кончилось. Я считался в отпуску до окончания наук. В то время
                    воспитывались мы не по-нонешнему. С пятилетнего возраста отдан я был на руки стремянному Савельичу,
                    за трезвое поведение пожалованному мне в дядьки. Под его надзором на двенадцатом году выучился я
                    русской грамоте и мог очень здраво судить о свойствах борзого кобеля. В это время батюшка нанял для
                    меня француза, мосье Бопре, которого выписали из Москвы вместе с годовым запасом вина и прованского
                    масла. Приезд его сильно не понравился Савельичу. «Слава богу, — ворчал он про себя, — кажется, дитя
                    умыт, причесан, накормлен. Куда как нужно тратить лишние деньги и нанимать мусье, как будто и своих
                    людей не стало!» Бопре в отечестве своем был парикмахером, потом в Пруссии солдатом, потом приехал в
                    Россию pour etre outchitel 1, не очень понимая значение этого слова. Он был добрый малый, но ветрен
                    и беспутен до крайности. Главною его слабостию была страсть к прекрасному полу; нередко за свои
                    нежности получал он толчки, от которых охал по целым суткам. К тому же не был он (по его выражению)
                    и врагом бутылки, т. е. (говоря по-русски) любил хлебнуть лишнее. Но как вино подавалось у нас
                    только за обедом, и то по рюмочке, причем учителя обыкновенно и обносили, то мой Бопре очень скоро
                    привык к русской настойке и даже стал предпочитать ее винам своего отечества, как не в пример более
                    полезную для желудка. Мы тотчас поладили, и хотя по контракту обязан он был учить меня
                    по-французски, по-немецки и всем наукам, но он предпочел наскоро выучиться от меня кое-как болтать
                    по-русски, — и потом каждый из нас занимался уже своим делом. Мы жили душа в душу. Другого ментора я
                    и не желал. Но вскоре судьба нас разлучила, и вот по какому случаю: Прачка Палашка, толстая и рябая
                    девка, и кривая коровница Акулька как-то Отец мой Андрей Петрович Гринев в молодости своей служил
                    при графе Минихе и вышел в отставкупремьер-майором в 17.. году. С тех пор жил он в своей Симбирской
                    деревне, где и женился на девице Авдотье Васильевне Ю., дочери бедного тамошнего дворянина. Нас было
                    девять человек детей. Все мои братья и сестры умерли во младенчестве. Матушка была еще мною брюхата,
                    как уже я был записан в Семеновский полк сержантом, по милости майора гвардии князя В., близкого
                    нашего родственника. Если бы паче всякого чаяния матушка родила дочь, то батюшка объявил бы куда
                    следовало о смерти неявившегося сержанта, и дело тем бы и кончилось. Я считался в отпуску до
                    окончания наук. В то время воспитывались мы не по-нонешнему. С пятилетнего возраста отдан я был на
                    руки стремянному Савельичу, за трезвое поведение пожалованному мне в дядьки. Под его надзором на
                    двенадцатом году выучился я русской грамоте и мог очень здраво судить о свойствах борзого кобеля. В
                    это время батюшка нанял для меня француза, мосье Бопре, которого выписали из Москвы вместе с годовым
                    запасом вина и прованского масла. Приезд его сильно не понравился Савельичу. «Слава богу, — ворчал
                    он про себя, — кажется, дитя умыт, причесан, накормлен. Куда как нужно тратить лишние деньги и
                    нанимать мусье, как будто и своих людей не стало!» Бопре в отечестве своем был парикмахером, потом в
                    Пруссии солдатом, потом приехал в Россию pour etre outchitel 1, не очень понимая значение этого
                    слова. Он был добрый малый, но ветрен и беспутен до крайности. Главною его слабостию была страсть к
                    прекрасному полу; нередко за свои нежности получал он толчки, от которых охал по целым суткам. К
                    тому же не был он (по его выражению) и врагом бутылки, т. е. (говоря по-русски) любил хлебнуть
                    лишнее. Но как вино подавалось у нас только за обедом, и то по рюмочке, причем учителя обыкновенно и
                    обносили, то мой Бопре очень скоро привык к русской настойке и даже стал предпочитать ее винам
                    своего отечества, как не в пример более полезную для желудка. Мы тотчас поладили, и хотя по
                    контракту обязан он был учить меня по-французски, по-немецки и всем наукам, но он предпочел наскоро
                    выучиться от меня кое-как болтать по-русски, — и потом каждый из нас занимался уже своим делом. Мы
                    жили душа в душу. Другого ментора я и не желал. Но вскоре судьба нас разлучила, и вот по какому
                    случаю: Прачка Палашка, толстая и рябая девка, и кривая коровница Акулька как-то Петрович Гринев в
                    молодости своей служил при графе Минихе и вышел в отставкупремьер-майором в 17.. году. С тех пор жил
                    он в своей Симбирской деревне, где и женился на девице Авдотье Васильевне Ю., тамошнего дворянина.
                    Нас было девять человек детей. Все мои братья и сестры умерли во младенчестве. Матушка была еще мною
                    брюхата, как уже я был записан в Семеновский полк сержантом, по нашего родственника. Если бы паче
                    всякого чаяния матушка родила дочь, то родила дочь, то батюшка то батюшка объявил бы куда следовало
                    о смерти неявившегося сержанта, и дело тем бы и кончилось. Я считался в считался в отпуску до
                    окончания наук. В то время воспитывались мы не по-нонешнему. С пятилетнего пятилетнего возраста
                    отдан я был на руки стремянному Савельичу, за трезвое поведение пожалованному мне в дядьки. Под его
                    надзором на двенадцатом году выучился я русской грамоте и мог очень здраво борзого кобеля. В это
                    время батюшка нанял для меня француза, мосье Бопре, которого выписали из Москвы вместе с годовым
                    запасом вина и прованского масла. Приезд его сильно не понравился Савельичу. «Слава богу, — ворчал
                    он про себя, — кажется, дитя умыт, причесан, накормлен. Куда как нужно тратить нанимать мусье, как
                    будто и своих людей не стало!» Бопре в отечестве своем был парикмахером, потом в потом приехал в
                    outchitel 1, не очень понимая значение этого слова. Он был добрый малый, но ветрен и беспутен до и
                    беспутен до крайности. Главною его слабостию была страсть к была страсть к прекрасному полу; нередко
                    за свои нежности получал он толчки, от которых охал по целым суткам. К тому же не был выражению) и
                    врагом бутылки, т. е. любил хлебнуть лишнее. Но как вино подавалось у нас только за только за
                    обедом, и то по учителя обыкновенно и обносили, то мой Бопре очень скоро привык к русской настойке и
                    даже стал предпочитать ее винам своего отечества, как не в пример более полезную для желудка. Мы
                    тотчас тотчас поладили, и хотя по контракту обязан он был учить меня по-французски, по-немецки и
                    всем наукам, но он предпочел наскоро выучиться от меня кое-как болтать по-русски, — и потом каждый
                    из нас занимался уже своим делом. Мы жили душа в душу. жили душа в душу. Другого ментора я и не
                    желал. Но вскоре судьба нас разлучила, и вот по какому случаю: Прачка Палашка, толстая и рябая
                    девка, и кривая коровница Акулька как-то Отец мой Андрей Петрович Гринев в молодости своей служил
                    при графе Минихе и вышел в отставкупремьер-майором в 17.. году. С тех пор жил он в своей Симбирской
                    деревне, где и женился на девице Авдотье Васильевне Ю., дочери бедного тамошнего дворянина. Нас было
                    девять человек детей. Все мои братья и сестры умерли во младенчестве. Матушка была еще мною брюхата,
                    как уже я был записан в Семеновский полк сержантом, по милости майора гвардии князя В., близкого
                    нашего родственника. Если бы паче всякого чаяния матушка родила дочь, то батюшка объявил бы куда
                    следовало о смерти неявившегося сержанта, и дело тем бы и кончилось. Я считался в отпуску до
                    окончания наук. В то время воспитывались мы не по-нонешнему. С пятилетнего возраста отдан я был на
                    руки стремянному Савельичу, за трезвое поведение пожалованному мне в дядьки. Под его надзором на
                    двенадцатом году выучился я русской грамоте и мог очень здраво судить о свойствах борзого кобеля. В
                    это время батюшка нанял для меня француза, мосье Бопре, которого выписали из Москвы вместе с годовым
                    запасом вина и прованского масла. Приезд его сильно не понравился Савельичу. «Слава богу, — ворчал
                    он про себя, — кажется, дитя умыт, причесан, накормлен. Куда как нужно тратить лишние деньги и
                    нанимать мусье, как будто и своих людей не стало!» Бопре в отечестве своем был парикмахером, потом в
                    Пруссии солдатом, потом приехал в Россию pour etre outchitel 1, не очень понимая значение этого
                    слова. Он был добрый малый, но ветрен и беспутен до крайности. Главною его слабостию была страсть к
                    прекрасному полу; нередко за свои нежности получал он толчки, от которых охал по целым суткам. К
                    тому же не был он (по его выражению) и врагом бутылки, т. е. (говоря т. е. (говоря по-русски) любил
                    хлебнуть лишнее. Но как вино подавалось у нас только за обедом, и то по рюмочке, причем учителя
                    обыкновенно и обносили, то мой Бопре очень скоро привык к русской привык к русской настойке и даже
                    стал предпочитать ее винам своего отечества, как не в пример более полезную для желудка. Мы тотчас
                    поладили, и хотя по контракту обязан он был учить меня по-французски, по-немецки и всем наукам, но
                    он предпочел наскоро выучиться от меня кое-как болтать по-русски, — и потом каждый из нас занимался
                    уже своим делом. Мы жили душа в душу. Другого ментора я и не желал. Но вскоре судьба нас разлучила,
                    и вот по какому случаю: Прачка Палашка, толстая и рябая девка, и кривая коровница Акулька как-то
                    Отец мой Андрей Петрович Гринев в молодости своей служил при графе Минихе и вышел в
                    отставкупремьер-майором в 17.. году. С тех пор жил он в своей Симбирской деревне, где и женился на
                    девице Авдотье Васильевне Ю., дочери бедного тамошнего дворянина. Нас было девять человек детей. Все
                    мои братья и сестры умерли во младенчестве. Матушка была еще мною брюхата, как уже я был записан в
                    Семеновский полк сержантом, по милости майора гвардии князя В., близкого нашего родственника. Если
                    бы паче всякого чаяния матушка родила дочь, то батюшка объявил бы куда следовало о смерти
                    неявившегося сержанта, и дело тем бы и кончилось. Я считался в отпуску до окончания наук. В то время
                    воспитывались мы не по-нонешнему. С пятилетнего возраста отдан я был на руки стремянному Савельичу,
                    за трезвое поведение пожалованному мне в дядьки. Под его надзором на двенадцатом году выучился я
                    русской грамоте и мог очень здраво судить о свойствах борзого кобеля. В это время батюшка нанял для
                    меня француза, мосье Бопре, которого выписали из Москвы вместе с годовым запасом вина и прованского
                    масла. Приезд его сильно не понравился Савельичу. «Слава богу, — ворчал он про себя, — кажется, дитя
                    умыт, причесан, накормлен. Куда как нужно тратить лишние деньги и нанимать мусье, как будто и своих
                    людей не стало!» Бопре в отечестве своем был парикмахером, потом в Пруссии солдатом, потом приехал в
                    Россию pour etre outchitel 1, не очень понимая значение этого слова. Он был добрый малый, но ветрен
                    и беспутен до крайности. Главною его слабостию была страсть к прекрасному полу; нередко за свои
                    нежности получал он толчки, от которых охал по целым суткам. К тому же не был он (по его выражению)
                    и врагом бутылки, т. е. (говоря по-русски) любил хлебнуть лишнее. Но как вино подавалось у нас
                    только за обедом, и то по рюмочке, причем учителя обыкновенно и обносили, то мой Бопре очень скоро
                    привык к русской настойке и даже стал предпочитать ее винам своего отечества, как не в пример более
                    полезную для желудка. Мы тотчас поладили, и хотя по контракту обязан он был учить меня
                    по-французски, по-немецки и всем наукам, но он предпочел наскоро выучиться от меня кое-как болтать
                    по-русски, — и потом каждый из нас занимался уже своим делом. Мы жили душа в душу. Другого ментора я
                    и не желал. Но вскоре судьба нас разлучила, и вот по какому случаю: Прачка Палашка, толстая и рябая
                    девка, и кривая коровница Акулька как-то
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.SOFT_WHITE,
        paddingTop: 50,
        paddingRight: 25,
        paddingLeft: 35,
    },
});

const stylesAppBar = StyleSheet.create({
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

const stylesCover = StyleSheet.create({
    cover: {
        alignSelf: 'flex-end',
        height: Dimensions.get('screen').width / 1.2,
        width: '100%',
        borderRadius: 40,
        marginTop: 20,
    },
});

const stylesGrade = StyleSheet.create({
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

const stylesStoryInfo = StyleSheet.create({
    story_container: {
        height: 160,
    },
    story_info_name_progress_container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingTop: 30,
    },
    story_name_text: {
        width: '80%',
        fontSize: 34,
        fontFamily: 'OpenSans_Regular',
    },
    image_clock: {
        height: 24,
        width: 24,
    },
    read_time_text: {
        fontSize: 14,
        fontFamily: 'OpenSans_Regular',
    },
    read_time_container: {
        alignItems: 'center',
        paddingTop: 10,
    },
    story_author_text: {
        fontSize: 18,
        fontFamily: 'OpenSans_Regular',
        paddingLeft: 15,
        paddingTop: 10,
    },
});

const stylesProgressBar = StyleSheet.create({
    progress_bar_container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'flex-end',
    },
    position_progress_bar_container: {
        alignItems: 'flex-end',
    },
    image_container: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
    },
});

const stylesProgressBarText = StyleSheet.create({
    text_container: {
        alignItems: 'center',
        width: 40,
        height: 20,
        alignSelf: 'flex-end',
        marginRight: 5,
    },
    text_progress: {
        fontFamily: 'OpenSans_Regular',
    },
});

const stylesStoryText = StyleSheet.create({
    text: {
        fontSize: 18,
        fontFamily: 'OpenSans_Regular',
        paddingHorizontal: 15,
    },
});

export default StoryScreen;
