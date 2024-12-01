/**
 * Represents a Book with properties including ID, title, author, publisher, and other characteristics.
 * The Book class contains getters and setters for accessing and updating book attributes.
 */

enum BookType {
    hardcover,
    paperback,
    ebook,
    audiobook,
  } // enum for book type
  
  enum Condition {
    NEW,
    USED,
  }
  
  class Book {
    private bookID: number;
    private title: string;
    private author: string;
    private publisher: string;
    private numberOfPages: number;
    private condition: Condition;
    private genre: string;
    private type: BookType;
    private isAvailable: boolean;
  
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
    constructor(
      bookID: number,
      title: string,
      author: string,
      publisher: string,
      numOfPages: number,
      condition: Condition,
      genre: string,
      type: BookType,
      isAvailable: boolean
    ) {
      this.bookID = bookID;
      this.title = title;
      this.author = author;
      this.publisher = publisher;
      this.numberOfPages = numOfPages;
      this.condition = condition;
      this.genre = genre;
      this.type = type;
      this.isAvailable = isAvailable;
    }
  
    // GETTERS - Allows read access to private properties
  
    /**
     * Retrieves the unique identifier for the book.
     * @returns {number} The book ID.
     */
    public getBookID(): number {
      return this.bookID;
    }
  
    /**
     * Retrieves the title of the book.
     * @returns {string} The title of the book.
     */
    public getTitle(): string {
      return this.title;
    }
  
    /**
     * Retrieves the author of the book.
     * @returns {string} The author of the book.
     */
    public getAuthor(): string {
      return this.author;
    }
  
    /**
     * Retrieves the publisher of the book.
     * @returns {string} The publisher of the book.
     */
    public getPublisher(): string {
      return this.publisher;
    }
  
    /**
     * Retrieves the number of pages in the book.
     * @returns {number} The number of pages in the book.
     */
    public getNumOfPages(): number {
      return this.numberOfPages;
    }
  
    /**
     * Retrieves the condition of the book.
     * @returns {string} The condition of the book.
     */
    public getCondition(): Condition {
      return this.condition;
    }
  
    /**
     * Retrieves the genre of the book.
     * @returns {string} The genre of the book.
     */
    public getGenre(): string {
      return this.genre;
    }
  
    /**
     * Retrieves the type of the book (e.g. fiction, non-fiction, etc.).
     * @returns {BookType} The type of the book.
     */
    public getType(): BookType {
      return this.type;
    }
  
    /**
     * Retrieves the availability status of the book.
     * @returns {boolean} The availability status of the book.
     */
    public getIsAvailable(): boolean {
      return this.isAvailable;
    }
  
    // SETTERS - Allows write access to private properties
  
    /**
     * Sets the unique identifier for the book.
     * @param {number} bookID - Unique identifier for the book.
     */
    public setBookID(bookID: number) {
      this.bookID = bookID;
    }
  
    /**
     * Sets the title of the book.
     * @param {string} title - The title of the book.
     */
    public setTitle(title: string) {
      this.title = title;
    }
  
    /**
     * Sets the author of the book.
     * @param {string} author - The author of the book.
     */
    public setAuthor(author: string) {
      this.author = author;
    }
  
    /**
     * Sets the publisher of the book.
     * @param {string} publisher - The publisher of the book.
     */
    public setPublisher(publisher: string) {
      this.publisher = publisher;
    }
  
    /**
     * Sets the number of pages in the book.
     * @param {number} numberOfPages - The number of pages in the book.
     */
    public setNumberOfPages(numberOfPages: number) {
      this.numberOfPages = numberOfPages;
    }
  
    /**
     * Sets the condition of the book (e.g. "new", "used", etc.).
     * @param {string} condition - The condition of the book.
     */
    public setCondition(condition: Condition) {
      this.condition = condition;
    }
  
    /**
     * Sets the genre of the book (e.g. fiction, non-fiction, romance, sci-fi, etc.).
     * @param {string} genre - The genre of the book.
     */
    public setGenre(genre: string) {
      this.genre = genre;
    }
  
    /**
     * Sets the type of the book.
     * @param {BookType} type - The type of the book. Can be one of
     * "hardcover", "paperback", "ebook", or "audiobook".
     */
    public setType(type: BookType) {
      this.type = type;
    }
  
    /**
     * Sets the availability status of the book.
     * @param {boolean} isAvailable - True if the book is available, false if not.
     */
    public setIsAvailable(isAvailable: boolean) {
      this.isAvailable = isAvailable;
    }
  
    /**
     * Add a book to the library system's catalog.
     */
    public addBook(): void {
      // TODO: Implement logic to add book
    }
  
    /**
     * Delete a book from the library system's catalog.
     */
    public deleteBook(): void {
      // TODO: Implement logic to delete book
    }
  }
  
  export default Book;
  