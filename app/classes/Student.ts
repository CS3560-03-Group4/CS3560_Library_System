class Student extends User {
  private studentID: number;
  private amountDue: number;

  /**
   * Constructor for initializing a Student with a role, name, phone number, address, email, student ID, and amount due.
   *
   * @param role - The role of the user
   * @param name - The name of the user
   * @param phoneNumber - The phone number of the user
   * @param address - The address of the user
   * @param email - The email of the user
   * @param studentID - The ID of the student
   * @param amountDue - The amount the student owes
   */
  constructor(
    role: Role,
    name: string,
    phoneNumber: string,
    address: string,
    email: string,
    studentID: number,
    amountDue: number
  ) {
    super(role = Role.Student, name, phoneNumber, address, email);
    this.studentID = studentID;
    this.amountDue = amountDue;
  }

  /**
   * Retrieves the student ID.
   * @returns {number} The student ID.
   */
  public getStudentID(): number {
    return this.studentID;
  }

  /**
   * Sets the student ID.
   * @param {number} newStudentID - The new student ID to set.
   */
  public setStudentID(newStudentID: number) {
    this.studentID = newStudentID;
  }

  /**
   * Retrieves the amount due from the student.
   * @returns {number} The amount due from the student.
   */
  public getAmountDue(): number {
    return this.amountDue;
  }

  /**
   * Sets the amount due from the student.
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
}

export default Student;
