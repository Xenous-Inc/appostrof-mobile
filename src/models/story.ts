import IAuthor from './author';

interface IStory {
    id: string;
    title: string | null;
    authors: Array<IAuthor>;
    description: string | null;
    cover: string | null;
    timeToRead: number | null;
    linkToText: string | null;
    tags: Array<string> | null;
    rating: number | null;
    date: string | null;
    progress: number | null;
}

export default IStory;
