export const pluralConverter = (quantity: number, word: string) => {
  if (quantity === 1) {
    return `${quantity} ${word}`;
  } else {
    return `${quantity} ${word}s`;
  }
};
