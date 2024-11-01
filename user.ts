class User {
    name: string;
    phoneNumber: string;
    email: string;
    // address

    constructor(name: string, phoneNumber: string, email: string){
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    getName(): string{
        return this.name;
    }

    getPhoneNumber(): string{
        return this.phoneNumber;
    }

    getEmail(): string{
        return this.email;
    }
}

// class Student extends User{
//     studentID: string;
//     constructor
// }

// class Staff extends User{
//     staffID: string;
// }