// Define the Staff class extending User
class Staff extends User {
    private _staffID: string;

    constructor(name: string, phoneNumber: string, address: string, email: string, staffID: string) {
        super('Staff', name, phoneNumber, address, email);
        this._staffID = staffID;
    }

    // Static method to create a new Staff account
    static createAccount(name: string, phoneNumber: string, address: string, email: string, staffID: string): Staff {
        const newStaff = new Staff(name, phoneNumber, address, email, staffID);
        // Additional setup or database storage logic could go here.
        return newStaff;
    }

    // Getters
    get staffID(): string {
        return this._staffID;
    }

    // Override viewProfile method to display staff details
    viewProfile(): void {
        console.log(`Staff Profile: ${this.name}, Staff ID: ${this.staffID}`);
    }
}