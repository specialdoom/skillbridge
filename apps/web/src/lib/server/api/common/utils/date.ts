/**
 * Given a Date object's value, return the Date object representing the first Monday that comes before the given date.
 *
 * @param value
 * the value of a Date object
 *
 * @returns a Date object representing the first Monday that comes before the given date
 */
export function getMonday(value: number) {
	const d = new Date(value);
	const day = d.getDay();
	const diff = d.getDate() - day + (day == 0 ? -6 : 1);

	return new Date(d.setDate(diff));
}
