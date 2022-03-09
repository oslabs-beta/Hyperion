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


export const validateEmail = (email: string): boolean => {
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(email);
}