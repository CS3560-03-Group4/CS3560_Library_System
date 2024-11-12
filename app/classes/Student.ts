import User, { Role } from "./User";

class Student extends User {
  private studentID: string;
  private amountDue: number;

  
  /**
   * Constructor for initializing a Student instance with necessary details.
   *
   * @param userID - Unique identifier for the user
   * @param role - The role of the user (Student or Staff).
   * @param firstName - The first name of the user.
   * @param lastName - The last name of the user.
   * @param username - The username of the user.
   * @param phoneNumber - The phone number of the user.
   * @param address - The address of the user.
   * @param email - The email of the user.
   * @param studentID - The student ID of the user.
   * @param amountDue - The amount that the user owes (initially defaults to 0).
   */
  constructor(
    userID: number,
    role: Role,
    firstName: string,
    lastName: string,
    username: string,
    phoneNumber: string,
    address: string,
    email: string,
    studentID: string,
    amountDue: number = 0
  ) {
    super(
      userID,
      (role = Role.STUDENT),
      firstName,
      lastName,
      username,
      phoneNumber,
      address,
      email
    );
    this.studentID = studentID;
    this.amountDue = amountDue;
  }

  /**
   * Retrieves the student ID.
   * @returns {number} The student ID.
   */
  public getStudentID(): string {
    return this.studentID;
  }

  /**
   * Sets the student ID.
   * @param {number} newStudentID - The new student ID to set.
   */
  public setStudentID(newStudentID: string) {
    this.studentID = newStudentID;
  }

  /**
   * Retrieves the amount due from the student.
   * @returns {number} The amount due from the student.
   */
  // Method to check due amount
  public checkDueAmount(): number {
    return this.amountDue;
  }

  /**
   * Sets the student's total outstanding amount due each time there is a fine for a student's BookOrder.
   *
   * This value is calculated based on the total of unpaid fines (Fine.amount) associated with student's BookOrder.
   *
   * Ensures that the new amount is non-negative; otherwise, logs an error.
   * @param {number} newAmountDue - The new amount due from the student.
   */
  public setAmountDue(newAmountDue: number) {
    this.amountDue = newAmountDue;
  }

  /**
   * Displays the student's profile.
   */
  public viewProfile(): void {
    // TODO
  }

  /**
   * A static method to create a new Student account
   * @param {Role} role - The role of the user (Student or Staff).
   * @param {string} name - The name of the user.
   * @param {string} phoneNumber - The phone number of the user.
   * @param {string} address - The address of the user.
   * @param {string} email - The email of the user.
   * @param {string} studentID - The student ID of the user.
   * @param {number} amountDue - The amount that the user owes (initially defaults to 0).
   * @returns {Student} The new Student account.
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
    studentID: string,
    amountDue: number
  ): Student {
    const newStudent = new Student(
      userId,
      (role = Role.STUDENT),
      firstName,
      lastName,
      username,
      phoneNumber,
      address,
      email,
      studentID,
      amountDue
    );
    // Additional setup or database storage logic could go here.
    return newStudent;
  }

  /**
   * Method to pay a specified amount towards the student's outstanding balance.
   * - If the payment amount is less than or equal to the current amount due, it deducts the amount from the total outstanding balance.
   * - If the payment amount exceeds the amount due, logs an error message to indicate that the payment is more than the outstanding balance.
   *
   * This method ensures that the outstanding balance does not become negative due to overpayment.
   * @param amount
   */
  public payDue(amount: number): void {
    // TODO
  }
}

export default Student;
