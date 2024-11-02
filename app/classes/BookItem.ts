import Book from "./Book";
import BookOrder from "./BookOrder";

// An association class between Book and BookOrder
class BookItem {
    private book: Book;
    private bookOrder: BookOrder;

    /**
     * Constructor for initializing a BookItem with a Book and a BookOrder.
     *
     * @param book - The book for the book item
     * @param bookOrder - The book order for the book item
     */
    constructor(book: Book, bookOrder: BookOrder) {
        this.book = book;
        this.bookOrder = bookOrder;
    }

    /**
     * Retrieves the book associated with this BookItem.
     * @returns {Book} The book associated with this BookItem.
     */
    getBook(): Book {
        return this.book;
    }

    /**
     * Retrieves the book order associated with this BookItem.
     * @returns {BookOrder} The book order associated with this BookItem.
     */
    getBookOrder(): BookOrder {
        return this.bookOrder;
    }
}

export default BookItem;
