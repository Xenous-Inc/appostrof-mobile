import React from 'react';
import { View } from 'react-native';

enum Mode {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
}

type TMode = typeof Mode;

interface ISpaceProp {
    mode: Mode | Mode[keyof Mode];

    size: number;
}

const Space: React.FC<ISpaceProp> & { Mode: TMode } = ({ mode, size }) => {
    const width = mode === Mode.Horizontal ? size : 0;
    const height = mode === Mode.Vertical ? size : 0;

    return <View style={{ width, height }} />;
};
Space.Mode = Mode;

export default Space;
