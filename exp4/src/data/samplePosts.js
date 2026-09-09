// Sample social-media post/event data used to seed the Redux store.
// Dates are generated relative to "today" so the calendar always has
// something meaningful to show regardless of when the app is run.

function iso(daysFromToday) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export const PLATFORMS = ['Instagram', 'Facebook', 'LinkedIn', 'Twitter/X'];
export const STATUSES = ['Scheduled', 'Draft', 'Done', 'Posted'];

export const samplePosts = [
  {
    id: 'p1',
    title: 'Product Launch Teaser',
    description: 'Short teaser clip announcing the new product line.',
    date: iso(1),
    time: '10:00',
    platform: 'Instagram',
    status: 'Scheduled',
  },
  {
    id: 'p2',
    title: 'Behind the Scenes',
    description: 'Studio photos from this week\'s shoot.',
    date: iso(1),
    time: '15:30',
    platform: 'Twitter/X',
    status: 'Draft',
  },
  {
    id: 'p3',
    title: 'Weekly Roundup',
    description: 'Summary of this week\'s community highlights.',
    date: iso(2),
    time: '09:00',
    platform: 'LinkedIn',
    status: 'Scheduled',
  },
  {
    id: 'p4',
    title: 'Customer Spotlight',
    description: 'Featuring a great review from a long-time customer.',
    date: iso(3),
    time: '12:00',
    platform: 'Facebook',
    status: 'Posted',
  },
  {
    id: 'p5',
    title: 'Tutorial: Getting Started',
    description: 'Quick walkthrough for new users.',
    date: iso(4),
    time: '14:00',
    platform: 'Instagram',
    status: 'Done',
  },
  {
    id: 'p6',
    title: 'Flash Sale Announcement',
    description: '24-hour flash sale across all channels.',
    date: iso(4),
    time: '18:00',
    platform: 'Twitter/X',
    status: 'Scheduled',
  },
  {
    id: 'p7',
    title: 'Team Culture Post',
    description: 'A look at the team offsite.',
    date: iso(6),
    time: '11:00',
    platform: 'LinkedIn',
    status: 'Draft',
  },
  {
    id: 'p8',
    title: 'Milestone Celebration',
    description: 'Celebrating 10k followers.',
    date: iso(8),
    time: '10:30',
    platform: 'Instagram',
    status: 'Scheduled',
  },
  {
    id: 'p9',
    title: 'Recap Video',
    description: 'Recap of last month\'s campaign performance.',
    date: iso(10),
    time: '16:00',
    platform: 'Facebook',
    status: 'Done',
  },
  {
    id: 'p10',
    title: 'Industry News Share',
    description: 'Commentary on a recent industry report.',
    date: iso(13),
    time: '09:30',
    platform: 'LinkedIn',
    status: 'Scheduled',
  },
  {
    id: 'p11',
    title: 'Poll: Feature Requests',
    description: 'Ask followers what they want to see next.',
    date: iso(15),
    time: '13:00',
    platform: 'Twitter/X',
    status: 'Draft',
  },
  {
    id: 'p12',
    title: 'Holiday Promo',
    description: 'Early promo for the upcoming holiday season.',
    date: iso(20),
    time: '10:00',
    platform: 'Instagram',
    status: 'Scheduled',
  },
];
