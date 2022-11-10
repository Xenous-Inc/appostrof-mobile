import colors, { namedColors } from '@styles/colors';
import logs from '@utils/logs';

/*
 *  Examples:
 *  #0000ff to 0000ff
 *  #0000ffff to 0000ffff
 *  #00f to 0000ff
 *  #00ff to 0000ffff
 *  blue to 0000ff
 * */
export const formatColor = (color: string): string => {
    const pattern = new RegExp('^#([a-fA-F0-9]){3}$|[a-fA-F0-9]{4}$|[a-fA-F0-9]{6}$|[a-fA-F0-9]{8}$');

    if (!pattern.test(color) && !namedColors.get(color)) {
        // fixme: ask for reaction to invalid argument
        logs.utils.error('TypeError: passed color has an invalid format');
        return formatColor(colors.TRANSPARENT);
    }

    let formattedColor = (namedColors.get(color) || color).replace('#', '');

    if (formattedColor.length === 3 || formattedColor.length === 4) {
        const letters = formattedColor.match(/./g);
        if (!letters) {
            // fixme: ask for reaction to error
            logs.utils.error('RuntimeError: failed to split color to letters');
            return formatColor(colors.TRANSPARENT);
        }

        formattedColor = '';
        letters.forEach(letter => (formattedColor += letter + letter));
    }

    return formattedColor;
};

export const toHsva = (
    color: string,
): {
    h: number;
    s: number;
    v: number;
    a: number;
} => {
    const formattedColor = formatColor(color);

    const letters = formattedColor.match(/.{1,2}/g);
    if (!letters) {
        // fixme: ask for reaction to error
        logs.utils.error('RuntimeError: failed to split color to letters');
        return toHsva(colors.TRANSPARENT);
    }

    const [r, g, b, a] = letters.map(letter => parseInt(letter, 16)).map(number => number / 255);

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = max !== min ? max : 0;
    const v = max;
    const d = max - min;
    const s = max === 0 ? 0 : d / max;

    if (max !== min) {
        // eslint-disable-next-line default-case
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    return {
        h,
        s,
        v,
        a: a ? a : 1,
    };
};

export const toHex = (hsva: { h: number; s: number; v: number; a: number | undefined }): string => {
    const { h, s, v, a } = hsva;
    // eslint-disable-next-line init-declarations
    let r, g, b;

    const i: number = Math.floor(h * 6);
    const f: number = h * 6 - i;
    const p: number = v * (1 - s);
    const q: number = v * (1 - f * s);
    const t: number = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
        default:
            r = v;
            g = t;
            b = p;
    }

    return '#'
        .concat(
            [r, g, b]
                .map(number => Math.round(number * 255))
                .map(number => number.toString(16).padStart(2, '0'))
                .join(''),
        )
        .concat(
            a
                ? Math.round(a * 255)
                      .toString(16)
                      .padStart(2, '0')
                : 'FF',
        )
        .toUpperCase();
};

export const setAlpha = (color: string, alpha: number): string => {
    return '#'.concat(formatColor(color).slice(0, 6)).concat(
        Math.round(alpha * 255)
            .toString(16)
            .padStart(2, '0'),
    );
};

export const darkenColor = (color: string, force = -30): string => {
    const formattedColor = formatColor(color);

    const letters = formattedColor.match(/.{1,2}/g);
    if (!letters) {
        // fixme: ask for reaction to error
        logs.utils.error('RuntimeError: failed to split color to letters');
        return darkenColor(colors.WHITE);
    }

    const [r, g, b, a] = letters.map(letter => Math.max(Math.min(255, parseInt(letter, 16) + force), 0).toString(16));

    return '#'
        .concat([r, g, b].map(letter => letter.padStart(2, '0')).join(''))
        .concat(a ? a.padStart(2, '0') : 'FF')
        .toUpperCase();
};
