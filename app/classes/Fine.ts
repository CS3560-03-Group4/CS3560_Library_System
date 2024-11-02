class Fine {
  private amount: number;
  private status: string;

  /**
   * Creates a new Fine object.
   * @param {number} amount - The amount of the fine.
   * @param {string} status - The status of the fine, e.g. 'unpaid', 'paid', 'pending', etc.
   */
  constructor(amount: number, status: string) {
    this.amount = amount;
    this.status = status; // Status might be something like 'unpaid', 'paid', 'pending', etc.
  }

  /**
   * Updates the amount of the fine.
   * @param {number} newAmount - The new amount of the fine.
   */
  updateAmount(newAmount: number) {
    // TODO
  }

  /**
   * Updates the status of the fine.
   * @param {string} newStatus - The new status of the fine.
   */
  updateStatus(newStatus: string) {
    // TODO
  }

  /**
   * Displays the fine details to the console.
   */
  displayFineDetails() {
    // TODO
  }
}

export default Fine;
