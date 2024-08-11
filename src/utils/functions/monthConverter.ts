export const monthConverter = (days: number) => {
  const months = Math.floor(days / 30);
  return months > 1 ? `${months} months` : `${months} month`;
};
