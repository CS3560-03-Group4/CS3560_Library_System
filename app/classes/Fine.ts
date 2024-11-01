class Fine {
    private amount: number;
    private status: string;

    constructor(amount: number, status: string) {
        this.amount = amount;
        this.status = status; // Status might be something like 'unpaid', 'paid', 'pending', etc.
    }

    // Method to update the fine amount
    updateAmount(newAmount: number) {
        this.amount = newAmount;
    }

    // Method to change the status of the fine
    updateStatus(newStatus: string) {
        this.status = newStatus;
    }

    // Method to display fine details
    displayFineDetails() {
        console.log(`Amount: $${this.amount}`);
        console.log(`Status: ${this.status}`);
    }
}

/* Example usage:
let fine1 = new Fine(25.00, 'unpaid');
fine1.displayFineDetails();
fine1.updateAmount(30.00);
fine1.updateStatus('paid');
fine1.displayFineDetails(); */