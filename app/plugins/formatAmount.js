export const formatAmount = (amount) => {
  if (amount) {
    return Number(amount / 1000000000000000000n);
  }
  return 0;
}
