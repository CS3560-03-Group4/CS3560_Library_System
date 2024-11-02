class Staff extends User {
  private staffID: number;
  constructor(
    role: Role,
    name: string,
    phoneNumber: string,
    address: string,
    email: string,
    staffID: number
  ) {
    super((role = Role.Staff), name, phoneNumber, address, email);
    this.staffID = staffID;
  }

  /**
   * Retrieves the staff ID.
   * @returns {number} The staff ID.
   */
  public getStaffID(): number {
    return this.staffID;
  }

  /**
   * Sets the staff ID.
   * @param {number} newStaffID - The new staff ID to set.
   */
  public setStaffID(newStaffID: number) {
    this.staffID = newStaffID;
  }

  /**
   * Displays the staff's profile.
   */
  public viewProfile(): void {
    // TODO
  }
}

export default Staff;
