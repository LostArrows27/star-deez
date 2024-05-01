import { startOfWeek, setWeek, setYear, format } from "date-fns";

/**
 * Converts a week string in the format "yyyy-ww" to "mm/dd" format of the first day of the week.
 * @param weekStr The week string (e.g., "2024-15").
 * @returns The formatted string representing the start of the week in "mm/dd" format.
 */
function convertWeekToDate(weekStr: string): string {
  const [yearPart, weekPart] = weekStr.split("-");
  const year = parseInt(yearPart);
  const week = parseInt(weekPart);

  // Create a base date (typically the start of the year)
  let date = new Date(year, 0, 1);

  // Set the date to the first day of the specified week number
  date = setWeek(date, week, { weekStartsOn: 1, firstWeekContainsDate: 4 });

  // Ensure the year is correctly set (important for weeks that overlap years)
  date = setYear(date, year);

  // Start of the week (assuming weeks start on Monday)
  date = startOfWeek(date, { weekStartsOn: 1 });

  // Format the date to "mm/dd"
  const formattedDate = format(date, "MM/dd");

  return formattedDate;
}

export default convertWeekToDate;
