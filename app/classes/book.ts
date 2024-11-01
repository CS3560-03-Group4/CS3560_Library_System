class Book {
    private bookID: number;
    private title: string;
    private author: string;
    private publisher: string;
    private numberOfPages: number;
    private condition: string;
    private genre: string;
    private type: string;
    private isAvailable: boolean;


    constructor(bookID: number, title: string, author: string, publisher: string, numOfPages: number, condition: string, genre: string, type: string){
        this.bookID = bookID;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.numberOfPages = numOfPages;
        this.condition = condition;
        this.genre = genre;
        this.type = type;
        this.isAvailable = true;
    }

    getBookID(): number{
        return this.bookID;
    }

    getTitle(): string{
        return this.title;
    }

    getAuthor(): string{
        return this.author;
    }

    getPublisher(): string{
        return this.publisher;
    }

    getNumOfPages(): number{
        return this.numberOfPages;
    }

    getCondition(): string{
        return this.condition;
    }

    getGenre(): string{
        return this.genre;
    }

    getType(): string{
        return this.type;
    }




}
