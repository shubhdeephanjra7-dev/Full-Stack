const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function toISODate(d) {
  return d.toISOString().slice(0, 10);
}

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day; // shift so week starts Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Returns 7 day descriptors, Monday through Sunday, for the week containing
// `baseDate`.
export function getWeekDays(baseDate) {
  const start = startOfWeek(baseDate);
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push({
      date: toISODate(d),
      label: { weekday: WEEKDAY_LABELS[i], dayNumber: d.getDate() },
    });
  }
  return days;
}

// Returns one day descriptor per day of the month containing `baseDate`
// (28-31 days depending on the month) — used for the "Month" view, which
// stands in for the experiment's "30-day calendar" scenario.
export function getMonthDays(baseDate) {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    days.push({
      date: toISODate(d),
      label: { weekday: WEEKDAY_LABELS[(d.getDay() + 6) % 7], dayNumber: day },
    });
  }
  return days;
}

export function isSameDate(isoDate, date) {
  return isoDate === toISODate(date);
}

export function monthLabel(date) {
  return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}
