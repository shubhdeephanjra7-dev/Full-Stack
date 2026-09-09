// A fixed 7-day week fixture (dates chosen arbitrarily but consistent
// across tests) plus a matching 30-day fixture, so tests don't depend on
// "today" and are fully deterministic.

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function makeWeekDays(startISO = '2026-01-05') {
  const start = new Date(startISO);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    return { date: iso, label: { weekday: WEEKDAYS[i], dayNumber: d.getDate() }, isToday: false };
  });
}

export function makeMonthDays(startISO = '2026-02-01', count = 30) {
  const start = new Date(startISO);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    return {
      date: iso,
      label: { weekday: WEEKDAYS[i % 7], dayNumber: d.getDate() },
      isToday: false,
    };
  });
}

export const WEEK_DAYS = makeWeekDays();
export const TUESDAY = WEEK_DAYS[1].date;
export const THURSDAY = WEEK_DAYS[3].date;

export const weekPosts = [
  {
    id: 'w1',
    title: 'Tuesday Announcement',
    description: '',
    date: TUESDAY,
    time: '10:00',
    platform: 'Instagram',
    status: 'Scheduled',
  },
  {
    id: 'w2',
    title: 'Wednesday Recap',
    description: '',
    date: WEEK_DAYS[2].date,
    time: '09:00',
    platform: 'LinkedIn',
    status: 'Done',
  },
];
