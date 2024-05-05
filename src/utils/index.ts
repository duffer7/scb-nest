export const stringToBoolean = (string: string): boolean => {
  string = string.trim();
  if (!Number.isNaN(Number(string))) {
    return Boolean(Number(string));
  }
  if (string.toLowerCase() === 'false' || string.toLowerCase() === 'true') {
    return string.toLowerCase() === 'true' ? true : false;
  }
  return false;
};

export const buildSearchText = (array: string[]): string => {
  return array
    .reduce((acc, value) => {
      if (value !== undefined) {
        acc += `\"${value}"\ `;
      }
      return acc;
    }, '')
    .trim();
};