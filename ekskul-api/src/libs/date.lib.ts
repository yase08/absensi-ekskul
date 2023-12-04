export function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }
  
  // Function to get week number and year
export function getWeekNumberAndYear(date) {
    const d:any = new Date(date);
    const onejan:any = new Date(d.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
    return { weekNumber, year: d.getFullYear() };
  }
  
  // Function to get month and year
export function getMonthAndYear(date) {
    const d = new Date(date);
    const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    const year = d.getFullYear();
    return { month, formattedYear: year };
  }