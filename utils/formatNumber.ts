import BigNumber from "bignumber.js";

// 格式化数字显示
export const formatNumber = (value: string | number | undefined) => {
    if (!value) return "0";
    return new BigNumber(value).toFormat(2, BigNumber.ROUND_DOWN);
  };