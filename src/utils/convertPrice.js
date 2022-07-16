export const convertWeiToToken = (price) => {
  const payableAmount = price / 1000000000000000000;
  return payableAmount;
};
