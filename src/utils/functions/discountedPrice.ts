export const discountedPrice = (price: number, discount: number) => {
  const finalPrice = price - (price * discount) / 100;
  return parseFloat(finalPrice.toFixed(2));
};
