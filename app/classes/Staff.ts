import User, { Role } from "./User";

class Staff extends User {
  private staffID: string;
  constructor(
    userID: number,
    role: Role,
    firstName: string,
    lastName: string,
    username: string,
    phoneNumber: string,
    address: string,
    email: string,
    staffID: string
  ) {
    super(userID,(role = Role.STAFF), firstName, lastName, username, phoneNumber, address, email);
    this.staffID = staffID;
  }

  /**
   * Retrieves the staff ID.
   * @returns {number} The staff ID.
   */
  public getStaffID(): string {
    return this.staffID;
  }

  /**
   * Sets the staff ID.
   * @param {number} newStaffID - The new staff ID to set.
   */
  public setStaffID(newStaffID: string) {
    this.staffID = newStaffID;
  }

  /**
   * A static method to create a new Staff account
   * @param {string} name - The name of the user.
   * @param {string} phoneNumber - The phone number of the user.
   * @param {string} address - The address of the user.
   * @param {string} email - The email of the user.
   * @param {string} staffID - The staff ID of the user.
   * @returns {Staff} The new Staff account.
   */
  static createAccount(
    userId: number,
    role: Role,
    firstName: string,
    lastName: string,
    username: string,
    phoneNumber: string,
    address: string,
    email: string,
    staffID: string
  ): Staff {
    const newStaff = new Staff(
      userId,
      (role = Role.STAFF),
      firstName,
      lastName,
      username,
      phoneNumber,
      address,
      email,
      staffID
    );
    // Additional setup or database storage logic could go here.
    return newStaff;
  }

  /**
   * Displays the staff's profile.
   */
  public viewProfile(): void {
    // TODO
  }
}

export default Staff;
