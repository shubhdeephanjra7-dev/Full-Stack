// All dummy/seed data used to bootstrap localStorage on first run.
// Passwords are plain text on purpose — this is a frontend-only simulation, not a real auth system.

export const CATEGORIES = [
  'Design',
  'Technology',
  'Marketing',
  'Lifestyle',
  'Business',
  'Travel'
]

export const DUMMY_USERS = [
  // ---- Admins ----
  { id: 'admin-1', name: 'Ariana Cole', email: 'ariana.admin@postorganizer.com', password: 'admin123', role: 'admin' },
  { id: 'admin-2', name: 'Marcus Reyes', email: 'marcus.admin@postorganizer.com', password: 'admin123', role: 'admin' },
  { id: 'admin-3', name: 'Priya Nair', email: 'priya.admin@postorganizer.com', password: 'admin123', role: 'admin' },

  // ---- Collaborators (each tied to exactly one admin via adminId) ----
  { id: 'collab-1', name: 'Leo Fontaine', email: 'leo.collab@postorganizer.com', password: 'collab123', role: 'collaborator', adminId: 'admin-1' },
  { id: 'collab-2', name: 'Nina Osei', email: 'nina.collab@postorganizer.com', password: 'collab123', role: 'collaborator', adminId: 'admin-1' },
  { id: 'collab-3', name: 'Diego Fernandez', email: 'diego.collab@postorganizer.com', password: 'collab123', role: 'collaborator', adminId: 'admin-2' },
  { id: 'collab-4', name: 'Sara Kim', email: 'sara.collab@postorganizer.com', password: 'collab123', role: 'collaborator', adminId: 'admin-2' },
  { id: 'collab-5', name: 'Owen Bright', email: 'owen.collab@postorganizer.com', password: 'collab123', role: 'collaborator', adminId: 'admin-3' },
  { id: 'collab-6', name: 'Meera Iyer', email: 'meera.collab@postorganizer.com', password: 'collab123', role: 'collaborator', adminId: 'admin-3' },

  // ---- Regular users ----
  { id: 'user-1', name: 'Jordan Blake', email: 'jordan.user@postorganizer.com', password: 'user123', role: 'user' },
  { id: 'user-2', name: 'Aisha Rahman', email: 'aisha.user@postorganizer.com', password: 'user123', role: 'user' }
]

const img = (seed) => `https://picsum.photos/seed/${seed}/800/600`

const ADMIN_POST_SEEDS = {
  'admin-1': [
    { title: 'Minimalist Branding That Still Feels Warm', description: 'A look at how stripped-back logo systems can keep a human touch without losing consistency.', category: 'Design' },
    { title: 'Prototyping Faster Without Cutting Corners', description: 'Our team\'s workflow for turning rough sketches into clickable prototypes in under a day.', category: 'Design' },
    { title: 'Color Palettes Inspired by Golden Hour', description: 'Five warm, dusky palettes pulled straight from late-afternoon photography.', category: 'Lifestyle' },
    { title: 'Why Grid Systems Still Matter in 2026', description: 'Revisiting the humble grid and why it remains the backbone of good layout work.', category: 'Design' },
    { title: 'Onboarding Screens People Actually Finish', description: 'Small copy and pacing tweaks that raised our onboarding completion rate significantly.', category: 'Technology' }
  ],
  'admin-2': [
    { title: 'The Real Cost of Feature Creep', description: 'A candid breakdown of how "just one more feature" quietly derails product roadmaps.', category: 'Business' },
    { title: 'Growth Loops vs. Growth Hacks', description: 'Why sustainable loops beat one-off hacks for long-term marketing wins.', category: 'Marketing' },
    { title: 'Remote Teams, Real Trust', description: 'Practical rituals that keep distributed teams aligned without micromanaging.', category: 'Business' },
    { title: 'A Founder\'s Guide to Saying No', description: 'Learning to protect focus by declining good ideas that aren\'t the right ideas.', category: 'Business' },
    { title: 'Email Campaigns That Don\'t Feel Like Spam', description: 'Segmentation and timing tricks that keep open rates high and unsubscribes low.', category: 'Marketing' }
  ],
  'admin-3': [
    { title: 'Slow Travel Through the Nilgiri Hills', description: 'A week spent wandering tea estates, misty ridgelines, and quiet colonial towns.', category: 'Travel' },
    { title: 'Street Food Worth Planning a Trip Around', description: 'Six cities where the food stalls are the real main attraction.', category: 'Travel' },
    { title: 'Packing Light for Long-Term Travel', description: 'The exact carry-on kit that has survived eight months on the road.', category: 'Travel' },
    { title: 'Working From Anywhere: What Nobody Tells You', description: 'The unglamorous logistics behind a "location independent" lifestyle.', category: 'Lifestyle' },
    { title: 'The Case for Slower Mornings', description: 'How a twenty-minute routine change reshaped an entire travel schedule.', category: 'Lifestyle' }
  ]
}

const STATUS_CYCLE = ['published', 'published', 'published', 'draft', 'published']

export function buildDummyPosts() {
  const posts = []
  let counter = 0

  Object.entries(ADMIN_POST_SEEDS).forEach(([adminId, seedPosts]) => {
    const admin = DUMMY_USERS.find((u) => u.id === adminId)
    seedPosts.forEach((seed, index) => {
      counter += 1
      const daysAgo = counter * 2
      const date = new Date()
      date.setDate(date.getDate() - daysAgo)

      posts.push({
        id: `post-${adminId}-${index + 1}`,
        title: seed.title,
        description: seed.description,
        category: seed.category,
        image: img(`${adminId}-${index}`),
        date: date.toISOString(),
        createdBy: admin.id,
        createdByName: admin.name,
        adminId: admin.id,
        status: STATUS_CYCLE[index % STATUS_CYCLE.length]
      })
    })
  })

  return posts
}
