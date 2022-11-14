import Author from './author';

interface IStory {
    id: string | null;
    title: string | null;
    authors: Array<Author>;
    description: string | null;
    cover: string | null;
    timeToRead: number | null;
    linkToText: string | null;
    tags: Array<string> | null;
    rating: number | null;
    dateOfWriting: string | null;
}

class Story implements IStory {
    id: string | null;
    title: string | null;
    authors: Array<Author> | null;
    description: string | null;
    cover: string | null;
    timeToRead: number | null;
    linkToText: string | null;
    tags: Array<string> | null;
    rating: number | null;
    dateOfWriting: string | null;

    // TODO add constructor
}

export default Story;
