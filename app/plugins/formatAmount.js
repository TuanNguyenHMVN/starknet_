export const formatAmount = (amount) => {
  if (amount) {
    return Number(Number(amount) / 1000000000000000000).toFixed(4);
  }
  return 0;
}
