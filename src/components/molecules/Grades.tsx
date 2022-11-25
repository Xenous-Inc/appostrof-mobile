import { Image, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import React, { ReactElement } from 'react';

export interface IGrades extends ViewProps {
    rating: number;
}

const Grades: React.FC<IGrades> = props => {
    const { rating } = props;

    let grades: Array<ReactElement> = [];

    for (let i = 0; i < 5; i++) {
        grades = [
            ...grades,
            <Image
                key={`grade-star-${i}`}
                style={styles.content__star}
                source={i < rating ? require('@assets/icons/star_fill.png') : require('@assets/icons/star_empty.png')}
            />,
        ];
    }

    return (
        <View {...props} style={[styles.content, props.style]}>
            {grades}
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
    },
    content__star: {
        height: 26,
        width: 26,
        marginHorizontal: 4,
        aspectRatio: 1,
    },
});

export default Grades;
