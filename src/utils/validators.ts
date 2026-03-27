export const isOverdue = (dueDateString: string): boolean => {
    const dueDate = new Date(dueDateString);
    const today = new Date();
    // Set time to 0 to compare dates only
    today.setHours(0, 0, 0, 0);
    return today > dueDate;
};
