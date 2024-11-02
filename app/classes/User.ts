enum Role {
  Student,
  Staff,
}

// Define the base abstract class User
abstract class User {
  private role: Role;
  private name: string;
  private phoneNumber: string;
  private address: string;
  private email: string;

  /**
   * Constructor for initializing a User with a role, name, phone number, address, and email.
   *
   * @param role - The role of the user
   * @param name - The name of the user
   * @param phoneNumber - The phone number of the user
   * @param address - The address of the user
   * @param email - The email of the user
   */
  constructor(
    role: Role,
    name: string,
    phoneNumber: string,
    address: string,
    email: string
  ) {
    this.role = role;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.email = email;
  }

  /**
   * Retrieves the role of the user.
   * @returns {string} The role of the user.
   */
  getRole(): Role {
    return this.role;
  }

  /**
   * Sets the role of the user.
   * @param {Role} newRole - The new role of the user.
   */
  public setRole(newRole: Role) {
    this.role = newRole;
  }

  /**
   * Retrieves the name of the user.
   * @returns {string} The name of the user.
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Sets the name of the user.
   * @param {string} newName - The new name of the user.
   */
  public setName(newName: string) {
    this.name = newName;
  }

  /**
   * Retrieves the phone number of the user.
   * @returns {string} The phone number of the user.
   */
  public getPhoneNumber(): string {
    return this.phoneNumber;
  }

  /**
   * Sets the phone number of the user.
   * @param {string} newPhoneNumber - The new phone number of the user.
   */
  public setPhoneNumber(newPhoneNumber: string) {
    this.phoneNumber = newPhoneNumber;
  }

  /**
   * Retrieves the address of the user.
   * @returns {string} The address of the user.
   */
  public getAddress(): string {
    return this.address;
  }

  /**
   * Sets the address of the user.
   * @param {string} newAddress - The new address of the user.
   */
  public setAddress(newAddress: string) {
    this.address = newAddress;
  }

  /**
   * Retrieves the email of the user.
   * @returns {string} The email of the user.
   */
  public getEmail(): string {
    return this.email;
  }

  /**
   * Sets the email of the user.
   * @param {string} newEmail - The new email of the user.
   */
  public setEmail(newEmail: string) {
    this.email = newEmail;
  }

  /**
   * Displays the user's profile.
   */
  abstract viewProfile(): void;

  /**
   * Updates the contact details of the user.
   * @param {string} newPhoneNumber - The new phone number of the user.
   * @param {string} newAddress - The new address of the user.
   * @param {string} newEmail - The new email of the user.
   */
  public updateContactDetails(
    newPhoneNumber: string,
    newAddress: string,
    newEmail: string
  ): void {
    this.phoneNumber = newPhoneNumber;
    this.address = newAddress;
    this.email = newEmail;
  }
}
