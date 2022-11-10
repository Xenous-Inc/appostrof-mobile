import React from 'react';
import { View } from 'react-native';

enum Mode {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
}

type TMode = typeof Mode;

interface ISpaceProp {
    mode: Mode;

    size: number;
}

const Space: React.FC<ISpaceProp> & { Mode: TMode } = ({ mode, size }) => {
    const width = mode === Mode.Horizontal ? 0 : size;
    const height = mode === Mode.Vertical ? 0 : size;

    return <View style={{ width, height }} />;
};
Space.Mode = Mode;

export default Space;
