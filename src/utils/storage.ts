import { Storage } from 'expo-storage';
import logs from './logs';

export const StorageKeys = {
    STORY: 'STORAGE_STORY',
};

export const readData = async <T>(key: string): Promise<T | undefined> => {
    try {
        const json = await Storage.getItem({ key });
        if (json) {
            const data = JSON.parse(json) as T;
            logs.storage.debug('READ DATA SUCCESSFULLY.');
            return data;
        }

        throw new Error('request failed');
    } catch (err) {
        logs.storage.error('FAILED TO GET DATA.', err);

        return undefined;
    }
};

export const writeData = async <T>(key: string, value: T) => {
    try {
        await Storage.setItem({ key, value: JSON.stringify(value) });
        logs.storage.debug('WRITE DATA SUCCESSFULLY');
    } catch (err) {
        logs.storage.error('FAILED TO WRITE DATA', err);
    }
};
