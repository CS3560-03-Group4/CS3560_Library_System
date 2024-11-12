import { db } from "@/lib/db";
import { createNewUser } from "@prisma/client/sql";

export enum Role {
  STUDENT = "STUDENT",
  STAFF = "STAFF",
}

// Define the base abstract class User
abstract class User {
  private userID: number;
  private role: Role;
  private firstName: string;
  private lastName: string;
  private username: string;
  private phoneNumber: string;
  private address: string;
  private email: string;

  /**
   * Constructor for initializing a User with a role, name, phone number, address, and email.
   *
   * @param userID - The ID of the user
   * @param role - The role of the user
   * @param firstName - The first name of the user
   * @param lastName - The last name of the user
   * @param username - The username of the user
   * @param phoneNumber - The phone number of the user
   * @param address - The address of the user
   * @param email - The email of the user
   */
  constructor(
    userID: number,
    role: Role,
    firstName: string,
    lastName: string,
    username: string,
    phoneNumber: string,
    address: string,
    email: string
  ) {
    this.userID = userID;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
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
  public getFirstName(): string {
    return this.firstName;
  }

  /**
   * Sets the name of the user.
   * @param {string} newName - The new name of the user.
   */
  public setFirstName(newFirstName: string) {
    this.firstName = newFirstName;
  }

  /**
   * Retrieves the name of the user.
   * @returns {string} The name of the user.
   */
  public getLastName(): string {
    return this.lastName;
  }

  /**
   * Sets the name of the user.
   * @param {string} newName - The new name of the user.
   */
  public setLastName(newLastName: string) {
    this.lastName = newLastName;
  }

  /**
   * Retrieves the username of the user.
   * @returns {string} The username of the user.
   */
  public getUserName(): string {
    return this.username;
  }
  
  /**
   * Sets the username of the user.
   * @param {string} newUsername - The new username of the user.
   */
  public setUserName(newUsername: string) {
    this.username = newUsername;
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
   * This is the async method to create a new user.
   * This method could be used in a concrete class or in the context where you create users.
   */
   static async createNewUser(firstName: string, lastName: string, username: string, password: string, email: string, role: Role) {
    try {
      // Example async operation (e.g., database call or external API request)
      const newUser = await db.$queryRawTyped(
        createNewUser(firstName, lastName, username, password, email, role)
      );
      return newUser;
    } catch (error) {
      console.error("Error creating new user:", error);
      throw error; // Optionally handle or rethrow the error
    }
  }
  
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

export default User;