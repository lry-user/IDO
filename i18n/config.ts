export type Locale = (typeof locales)[number];

export const locales = ['en-US', 'zh-TW', 'zh-CN'] as const;
export const defaultLocale: Locale = 'en-US';
