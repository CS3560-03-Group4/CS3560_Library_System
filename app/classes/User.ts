// Define the base abstract class User
abstract class User {
    private _role: string;
    private _name: string;
    private _phoneNumber: string;
    private _address: string;
    private _email: string;

    constructor(role: string, name: string, phoneNumber: string, address: string, email: string) {
        this._role = role;
        this._name = name;
        this._phoneNumber = phoneNumber;
        this._address = address;
        this._email = email;
    }

    // Getters and Setters
    get role(): string {
        return this._role;
    }

    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        this._name = newName;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    set phoneNumber(newPhoneNumber: string) {
        this._phoneNumber = newPhoneNumber;
    }

    get address(): string {
        return this._address;
    }

    set address(newAddress: string) {
        this._address = newAddress;
    }

    get email(): string {
        return this._email;
    }

    set email(newEmail: string) {
        this._email = newEmail;
    }

    // Method to view profile information
    abstract viewProfile(): void;

    // Method to update contact details
    updateContactDetails(newPhoneNumber: string, newAddress: string, newEmail: string): void {
        this.phoneNumber = newPhoneNumber;
        this.address = newAddress;
        this.email = newEmail;
    }
}