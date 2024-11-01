// BookItem.ts
class BookItem {
    private orderID: string;
    private bookID: string;
  
    constructor(orderID: string, bookID: string) {
      this.orderID = orderID;
      this.bookID = bookID;
    }
    // getter and setter

    public getOrderID(): string {
      return this.orderID;
    }
  
    public setOrderID(orderID: string): void {
      this.orderID = orderID;
    }
  
    public getBookID(): string {
      return this.bookID;
    }
  
    public setBookID(bookID: string): void {
      this.bookID = bookID;
    }
  }
  
  export default BookItem;