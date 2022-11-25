import IStory from '@models/story';

interface IUseStory {
    isLoading: boolean;
    story?: IStory;
}

export const useStory = (): IUseStory => {
    return { isLoading: true, story: undefined };
};
