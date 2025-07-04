export function getColorByDay(day: number) {
  // 使用天数作为种子生成一个确定性的颜色
  // 这样相同的天数每次都会生成相同的颜色
  const seed = day;

  // 使用简单的哈希算法将天数转换为0-360的色相值
  const hue = (seed * 137.5) % 360;

  // 将HSL转换为十六进制颜色
  const h = hue;
  const s = 70; // 饱和度固定为70%
  const l = 50; // 亮度固定为50%

  // 转换HSL为RGB
  const c = ((1 - Math.abs((2 * l) / 100 - 1)) * s) / 100;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l / 100 - c / 2;

  let r, g, b;
  if (h >= 0 && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h >= 180 && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h >= 240 && h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  // 转换为0-255范围
  const rgb = [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];

  // 返回Tailwind类名格式
  return `#${rgb[0].toString(16).padStart(2, "0")}${rgb[1]
    .toString(16)
    .padStart(2, "0")}${rgb[2].toString(16).padStart(2, "0")}`;
}
