export function getTodayDateString() {
    return new Date().toISOString().split("T")[0];
}

export function getAfterOneWeekDateString() {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split("T")[0];
}