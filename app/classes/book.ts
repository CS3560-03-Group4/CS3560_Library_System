class Book {
    bookID: number;
    title: string;
    author: string;
    numberOfPages: number;
    publisher: string;
    description: string;

    constructor(bookID: number, title: string, author: string, numOfPages: number, publisher: string, description: string){
        this.bookID = bookID;
        this.title = title;
        this.author = author;
        this.numberOfPages = numOfPages;
        this.publisher = publisher;
        this.description = description;
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

    getNumOfPages(): number{
        return this.numberOfPages;
    }

    getPublisher(): string{
        return this.publisher;
    }

    getDescription(): string{
        return this.description;
    }

}
