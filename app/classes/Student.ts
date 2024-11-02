// Define the Student class extending User
class Student extends User {
    private _studentID: string;
    private _amountDue: number;

    constructor(name: string, phoneNumber: string, address: string, email: string, studentID: string, amountDue: number = 0) {
        super('Student', name, phoneNumber, address, email);
        this._studentID = studentID;
        this._amountDue = amountDue;
    }

    // Static method to create a new Student account
    static createAccount(name: string, phoneNumber: string, address: string, email: string, studentID: string): Student {
        const newStudent = new Student(name, phoneNumber, address, email, studentID);
        // Additional setup or database storage logic could go here.
        return newStudent;
    }

    // Getters and Setters
    get studentID(): string {
        return this._studentID;
    }

    get amountDue(): number {
        return this._amountDue;
    }

    // Override viewProfile method to display student details
    viewProfile(): void {
        console.log(`Student Profile: ${this.name}, ID: ${this.studentID}, Amount Due: $${this.amountDue}`);
    }
    
    // Sets the student's total outstanding amount due each time there is a fine for a student's BookOrder
    // This value is calculated based on the total of unpaid fines (Fine.amount) associated with student's BookOrder.
    // Ensures that the new amount is non-negative; otherwise, logs an error.
    set amountDue(newAmountDue: number) {
        
    }

    // Method to pay a specified amount towards the student's outstanding balance.
    // - If the payment amount is less than or equal to the current amount due, it deducts the amount from the total outstanding balance.
    // - If the payment amount exceeds the amount due, logs an error message to indicate that the payment is more than the outstanding balance.
    // This method ensures that the outstanding balance does not become negative due to overpayment.
    payDue(amount: number): void {
        
    }

    // Method to check due amount
    checkDueAmount(): number {
        return this.amountDue;
    }
}