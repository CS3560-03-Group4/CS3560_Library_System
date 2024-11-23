enum Status {
  ORDERED = "ORDERED",
  BORROWED = "BORROWED",
  RETURNED = "RETURNED",
  CANCELLED = "CANCELLED",
  OVERDUE = "OVERDUE",
}

class BookOrder {
  private orderID: number;
  private dueDate: string;
  private status: Status;
  private borrowDate: string;

  constructor(
    orderID: number,
    dueDate: string,
    status: Status,
    borrowDate: string
  ) {
    this.orderID = orderID;
    this.dueDate = dueDate;
    this.status = status;
    this.borrowDate = borrowDate;
  }

  /**
   * Get the order ID.
   * @returns {number} The order ID.
   */
  getOrderID(): number {
    return this.orderID;
  }

  /**
   * Set the order ID for the book order.
   * @param {number} value - New order ID to set.
   */
  setOrderID(value: number) {
    this.orderID = value;
  }

  /**
   * Get the due date for the book order.
   * @returns {string} The due date as a string.
   */
  getDueDate(): string {
    return this.dueDate;
  }

  /**
   * Set the due date for the book order.
   * @param {string} value - New due date to set.
   */
  setDueDate(value: string) {
    this.dueDate = value;
  }

  /**
   * Get the status of the book order.
   * @returns {Status} The status of the book order.
   */
  getStatus(): Status {
    return this.status;
  }

  /**
   * Set the status of the book order.
   * @param {Status} status - New status to set.
   */
  setStatus(status: Status) {
    this.status = status;
  }

  /**
   * Get the borrow date for the book order.
   * @returns {string} The borrow date as a string.
   */
  getBorrowDate(): string {
    return this.borrowDate;
  }

  /**
   * Set the borrow date for the book order.
   * @param {string} borrowDate - New borrow date to set.
   */
  setBorrowDate(borrowDate: string) {
    this.borrowDate = borrowDate;
  }

  /**
   * Create a new book order.
   * @param {number} orderID - ID of the order.
   * @param {string} dueDate - Date when the order is due to be returned.
   * @param {Status} status - Status of the order.
   * @param {string} borrowDate - Date when the order was borrowed.
   */
  createBookOrder(
    orderID: number,
    dueDate: string,
    status: Status,
    borrowDate: string
  ): void {
    // TODO
  }

  /**
   * Cancel the book order by updating its status to Cancelled.
   * @param {number} orderID - ID of the order to be cancelled.
   */
  cancelBookOrder(orderID: number): void {
    // TODO
  }

  /**
   * Renew the book order by updating its status to Renewed.
   * @param {number} orderID - ID of the order to be renewed.
   */
  renewBookOrder(orderID: number): void {
    // TODO
  }

  /**
   * Return the book order by updating its status to Returned.
   * @param {number} orderID - ID of the order to be returned.
   */
  returnBookOrder(orderID: number): void {
    // TODO
  }
}

export default BookOrder;
