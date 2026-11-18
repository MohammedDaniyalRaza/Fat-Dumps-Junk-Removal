export const junkGuidePosts = [
  {
    slug: 'how-to-prep-for-a-cleanout',
    title: 'How to Prep for a Smooth Home Cleanout (Without Doing the Heavy Lifting)',
    kicker: 'Cleanout Prep',
    readTime: '3 min read',
    imageKey: 'emptyLivingRoom',
    excerpt:
      'You do not have to haul everything to the driveway before we arrive. Here is how to mark what stays, snap the right photos, and keep cleanout day effortless.',
    sections: [
      {
        heading: '1. Separate Keepers First, Not Everything',
        body: 'The fastest way to slow down a cleanout is sorting every drawer on pickup morning. Before we arrive, put sticky notes, painter’s tape, or a quick corner pile together for anything that stays. Everything else can stay right where it sits.',
      },
      {
        heading: '2. Take Wide Photos Before Box-Shuffling',
        body: 'Stand in the doorway of each room and take one wide shot showing the floor-to-ceiling volume. If you have heavy pieces tucked behind boxes—like a sleeper sofa or upright freezer—add a quick close-up and note any stairs or narrow hallways.',
      },
      {
        heading: '3. Check Hidden Spots One Last Time',
        body: 'Give closet top shelves, under-sink cabinets, and garage rafters a quick pass for personal documents, family photos, and hazardous liquids like old paint cans. If you are unsure whether an item can ride on the truck, ask us when you text your photos.',
      },
    ],
  },
  {
    slug: 'old-mattress-or-couch-options',
    title: 'What to Do With an Old Mattress or Couch in North County San Diego',
    kicker: 'Furniture Hauling',
    readTime: '3 min read',
    imageKey: 'mattressAndChair',
    excerpt:
      'Wait weeks for municipal bulky pickup, wrestle a sagging sectional into a borrowed pickup, or text a photo and let someone carry it down the stairs for you.',
    sections: [
      {
        heading: 'Why Bulky Items Pile Up',
        body: 'Mattresses and sleeper sofas do not fold neatly, do not fit in SUVs, and rarely get picked up on regular trash day without advance scheduling and curb placement rules.',
      },
      {
        heading: 'Inside Carry-Out vs. Curbside Wait',
        body: 'If your new bed or couch arrives tomorrow, leaving a stained mattress on the sidewalk for days invites HOA notices and weather damage. Texting a quick photo gets you a free estimate and a flexible window straight from the bedroom or living room.',
      },
      {
        heading: 'One Piece Is Never Too Small',
        body: 'Many homeowners wait until they have a full truckload before reaching out. With Fat Dumps, no job inquiry is too small—one old armchair, one king mattress, or a single dead washer is always worth a quick text.',
      },
    ],
  },
  {
    slug: 'weekend-garage-cleanout-checklist',
    title: 'The Realistic Weekend Garage Cleanout Checklist',
    kicker: 'Garage Purge',
    readTime: '4 min read',
    imageKey: 'clutteredGarage',
    excerpt:
      'Skip the 14-hour marathon that leaves half your stuff sitting on the driveway at sunset. Use this quick three-zone method instead.',
    sections: [
      {
        heading: 'Zone 1: Clear the Center Floor First',
        body: 'Start with whatever is blocking your walking path—cardboard boxes, broken coolers, deflated tires, and holiday bins. Clearing the center gives you room to actually see what is along the walls.',
      },
      {
        heading: 'Zone 2: Pull Out Rusty Gear & Project Leftovers',
        body: 'Broken bikes, dried-out garden hoses, warped scrap wood, and half-broken shelving eat up the most square footage. Group them together on one side of the bay and take a single wide photo.',
      },
      {
        heading: 'Zone 3: Let the Truck Take the Final Pile',
        body: 'Instead of making three separate dump runs in your own vehicle, send us a photo of the pile. We load it in one shot and sweep the concrete so you can actually park inside again.',
      },
    ],
  },
  {
    slug: 'donating-vs-hauling-guide',
    title: 'Donating vs. Hauling: A Quick Filter for Deciding What Goes Where',
    kicker: 'Smart Sorting',
    readTime: '3 min read',
    imageKey: 'appliancesPickup',
    excerpt:
      'Not everything belongs in a landfill, and not everything passes thrift-store drop-off rules. Here is a practical way to sort without getting stuck.',
    sections: [
      {
        heading: 'The 60-Second Condition Check',
        body: 'Local charities usually decline stained mattresses, torn upholstery, broken appliances, particleboard furniture with swollen corners, and outdated electronics. If an item needs repairs before someone could use it today, plan to haul it.',
      },
      {
        heading: 'Batch What Is Clean & Working',
        body: 'Set clean, intact small goods—dishes, tools, boxed books—in one area for local drop-off. That way your junk removal load focuses cleanly on broken, bulky, weathered, or unwanted items.',
      },
      {
        heading: 'When You Just Need the Space Back',
        body: 'During a tight move-out or estate deadline, perfection slows everything down. Snap photos of everything remaining, send them over for a free estimate, and clear the space in one pickup.',
      },
    ],
  },
];

export function getGuideBySlug(slug) {
  return junkGuidePosts.find((post) => post.slug === slug);
}
