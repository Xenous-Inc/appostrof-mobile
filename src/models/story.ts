import Author from './author';

interface IStory {
    id: string;
    title: string | null;
    authors: Array<Author>;
    description: string | null;
    cover: string | null;
    timeToRead: number | null;
    linkToText: string | null;
    tags: Array<string> | null;
    rating: number | null;
    dateOfWriting: string | null;
    dateOfReading: string | null;
    percentOfReading: number | null;
}

export default IStory;
