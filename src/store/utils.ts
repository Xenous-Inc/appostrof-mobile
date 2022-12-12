import { Ends } from './actions/constants';
import { IActionFlag } from './types';

/**
 * @description This function provides new type of action
 * @field type - type that should be changed
 * @field add - ending that replaces old ending of action
 */
export const changeType = (type: string, add: string): string => {
    let key = Object.values(Ends).find(endKey => type.endsWith(endKey));
    while (key) {
        type = type.substring(0, type.length - key.length);
        key = Object.values(Ends).find(endKey => type.endsWith(endKey));
    }
    return type + add;
};

/**
 * @description This function checks whether list contains necessary flag by its name
 * @field flagName - name of necessary flag
 * @field list - list from where to search
 */
export const flagCheck = (flagName: string, list: Array<IActionFlag>): boolean => {
    return list.some(obj => obj.name === flagName);
};
