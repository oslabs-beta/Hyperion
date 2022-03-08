/**
 * NEED TO COMPLETE
 * @param input 
 * @returns 
 */
export const formatInputString = (input: String) => {
  return input.trim();
}
 
/**
 * NEED TO COMPLETE 
 * @param input 
 * @returns 
 */
export const formatNumberInput = (input: number) => {
  return input; 
}



/**
 * 
 * @param input string t
 * @returns a boolean indicating whether a boolean is a number
 */
export const isNum = (input: string) : boolean => {
  if (typeof input !== 'string') return false; 
  if (Number.isNaN(Number(input.trim()))) return false; 
  return true;
}
