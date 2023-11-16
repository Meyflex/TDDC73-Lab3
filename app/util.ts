export function formatDate(dateString: string): string {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Extract the day, month, and year
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-11
    const year = date.getFullYear();

    // Combine them in dd/mm/YYYY format
    return `${day}/${month}/${year}`;
}