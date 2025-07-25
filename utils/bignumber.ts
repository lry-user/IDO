import BigNumber from "bignumber.js";
BigNumber.config({
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
});
export const bignumber = (value: number | string) => new BigNumber(value);
