class Payment {
    private paymentID: number;
    private paymentMethod: string;
    private date: Date;
    private amount: number;

    constructor(paymentID:number, paymentMethod:string, date:Date, amount:number) {
        this.paymentID = paymentID;
        this.paymentMethod = paymentMethod;
        this.date = date;
        this.amount = amount;
    }

    // Method to update payment details
    updatePaymentDetails(paymentMethod:string, amount:number) {
        this.paymentMethod = paymentMethod;
        this.amount = amount;
        this.date = new Date();  // Update the payment date to the current date
    }

    // Method to display payment details
    displayPaymentDetails() {
        console.log(`Payment ID: ${this.paymentID}`);
        console.log(`Payment Method: ${this.paymentMethod}`);
        console.log(`Date: ${this.date}`);
        console.log(`Amount: ${this.amount}`);
    }
}

/* Example usage:
let payment1 = new Payment(1, 'Credit Card', '2024-10-01', 150.00);
payment1.displayPaymentDetails();
payment1.updatePaymentDetails('Debit Card', 160.00);
payment1.displayPaymentDetails(); */
