import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Initialize plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (date: string | undefined) => {
    if (!date) return "-";
    
    // Get user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Convert UTC date to user's timezone and format
    return dayjs(date).tz(userTimezone).format("YYYY-MM-DD HH:mm:ss");
};

export const formatToUserTimezone = (date: string | undefined, format?: string) => {
    if (!date) return "-";
    
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return dayjs(date).tz(userTimezone).format(format || "YYYY-MM-DD HH:mm:ss");
};
