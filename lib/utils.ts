import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// 判断字符串是不是一个正常的图片地址
export function isImageUrl(url: string) {
  return (url.startsWith("http") || url.startsWith("/")) && /\.(png|jpg|jpeg|gif|webp|svg|ico|bmp|tiff|ico|heic|heif)$/i.test(url);
}

/**
 * 格式化日期为 YYYY-MM-DD HH:MM:SS 格式
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
