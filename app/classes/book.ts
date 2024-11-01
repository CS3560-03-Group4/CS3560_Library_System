/**
 * Represents a Book with properties including ID, title, author, publisher, and other characteristics.
 * The Book class contains getters and setters for accessing and updating book attributes.
 */
class Book {
    private _bookID: number;
    private _title: string;
    private _author: string;
    private _publisher: string;
    private _numberOfPages: number;
    private _condition: string;
    private _genre: string;
    private _type: string;
    private _isAvailable: boolean;

    /**
     * Constructor for initializing a Book instance with necessary details.
     * Sets default availability status to true.
     * 
     * @param bookID - Unique identifier for the book
     * @param title - Title of the book
     * @param author - Author of the book
     * @param publisher - Publisher of the book
     * @param numOfPages - Total pages in the book
     * @param condition - Condition of the book (e.g., new, used)
     * @param genre - Genre of the book (e.g., fiction, non-fiction)
     * @param type - Type of book (e.g., hardcover, paperback)
     */
    constructor(bookID: number, title: string, author: string, publisher: string, numOfPages: number, condition: string, genre: string, type: string){
        this._bookID = bookID;
        this._title = title;
        this._author = author;
        this._publisher = publisher;
        this._numberOfPages = numOfPages;
        this._condition = condition;
        this._genre = genre;
        this._type = type;
        this._isAvailable = true;
    }

    // GETTERS - Allows read access to private properties  

    get bookID(): number{
        return this._bookID;
    }

    get title(): string{
        return this._title;
    }

    get author(): string{
        return this._author;
    }

    get publisher(): string{
        return this._publisher;
    }

    get numOfPages(): number{
        return this._numberOfPages;
    }

    get condition(): string{
        return this._condition;
    }

    get genre(): string{
        return this._genre;
    }

    get type(): string{
        return this._type;
    }

    // SETTERS - Allows write access to private properties

    set bookID(bookID: number){
        this._bookID = bookID;
    }

    set title(title: number){
        this.title = title;
    }
    
    set author(author: number){
        this.author = author;
    }

    set publisher(publisher: number){
        this.publisher = publisher;
    }

    set numberOfPages(numberOfPages: number){
        this._numberOfPages = numberOfPages;
    }
    
    set condition(condition: number){
        this.condition = condition;
    }

    set genre(genre: number){
        this.genre = genre;
    }

    set type(type: number){
        this.type = type;
    }


    /**
     * Method to add a book (to be implemented)
     */
    addBook(): void {
        // TODO: Implement logic to add book
    }

    /**
     * Method to delete a book (to be implemented)
     */
    deleteBook(): void {
        // TODO: Implement logic to delete book
    }




}
