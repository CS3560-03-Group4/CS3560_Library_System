// BookItem.ts

class BookItem {
    // Order ID for the book item
    private orderID: string;
  
    // Book ID for the book item
    private bookID: string;
  
    // Constructor to initialize orderID and bookID
    constructor(orderID: string, bookID: string) {
      this.orderID = orderID;
      this.bookID = bookID;
    }
  
    // Getter for orderID
    public getOrderID(): string {
      return this.orderID;
    }
  
    // Setter for orderID
    public setOrderID(orderID: string): void {
      this.orderID = orderID;
    }
  
    // Getter for bookID
    public getBookID(): string {
      return this.bookID;
    }
  
    // Setter for bookID
    public setBookID(bookID: string): void {
      this.bookID = bookID;
    }
  }
  
  export default BookItem;
  