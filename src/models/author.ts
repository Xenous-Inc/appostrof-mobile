interface IAuthor {
    id: string | null;
    name: string | null;
    works?: Array<string> | null;
}

class Author implements IAuthor {
    id: string | null;
    name: string | null;
    works?: Array<string> | null;

    //TODO add constructor
}

export default Author;
