enum PaymentMethod {
  CREDIT_CARD,
  DEBIT_CARD,
  ACH,
}

class Payment {
  private paymentID: number;
  private paymentMethod: PaymentMethod;
  private date: string;
  private amount: number;

  /**
   * Constructor for initializing a Payment instance with necessary details.
   *
   * @param paymentID - Unique identifier for the payment
   * @param paymentMethod - Payment method (e.g., Credit Card, Debit Card)
   * @param date - Date of the payment
   * @param amount - Amount of the payment
   */
  constructor(
    paymentID: number,
    paymentMethod: PaymentMethod,
    date: string,
    amount: number
  ) {
    this.paymentID = paymentID;
    this.paymentMethod = paymentMethod;
    this.date = date;
    this.amount = amount;
  }

  public getPaymentID(): number {
    return this.paymentID;
  }

  public getPaymentMethod(): PaymentMethod {
    return this.paymentMethod;
  }

  public getDate(): string {
    return this.date;
  }

  public getAmount(): number {
    return this.amount;
  }

  public setPaymentID(paymentID: number) {
    this.paymentID = paymentID;
  }

  /**
   * Sets the payment method for the payment.
   * @param paymentMethod - The new payment method (e.g., Credit Card, Debit Card).
   */
  public setPaymentMethod(paymentMethod: PaymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  /**
   * Sets the date for the payment.
   * @param date - The new date of the payment in string format.
   */
  public setDate(date: string) {
    this.date = date;
  }

  /**
   * Sets the amount of the payment.
   * @param amount - The new amount of the payment
   */
  public setAmount(amount: number) {
    this.amount = amount;
  }

  /**
   * Updates the payment details with the new payment method and amount.
   * Also updates the payment date to the current date.
   * @param paymentMethod - New payment method
   * @param amount - New payment amount
   */
  public updatePaymentDetails(paymentMethod: string, amount: number) {
    // TODO
  }

  /**
   * Displays the payment details to the console.
   */
  public displayPaymentDetails() {
    // TODO
  }
}

export default Payment;
