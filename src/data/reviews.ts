export interface Review {
  reviewer: string;
  location: string;
  rating: number;
  platform: 'google' | 'yelp' | 'other';
  date: Date;
  verified: boolean;
  sourceUrl: string;
  text: string;
}

const reviewUrl = (platform: string, text: string) =>
  `https://www.${platform}.com/biz/sandoval-plumbing-chicago?dd_referrer=#reviews&q=${encodeURIComponent(text)}`;

export const reviews: Review[] = [
  {
    reviewer: 'Neal W.',
    location: 'Chicago, IL',
    rating: 5,
    platform: 'yelp',
    date: new Date('2024-09-19'),
    verified: true,
    sourceUrl: 'https://www.yelp.com/biz/sandoval-plumbing-chicago',
    text: "I didn't have a go-to plumber, so I called up one of larger plumbing companies in Chicago because I saw their fancy trucks. The guy who came out to give a quote wasn't even a plumber, and told me over $1,200 to fix the mechanism under the lid. \"Found\" Sandoval Plumbing online and couldn't be happier. Eduardo was very personable and there was no BS involved. Straightaway fixed the problem and with parts and labor, it was under $300. I now have a go-to plumber!",
  },
  {
    reviewer: 'Kim Z.',
    location: 'Chicago, IL',
    rating: 5,
    platform: 'yelp',
    date: new Date('2025-08-26'),
    verified: true,
    sourceUrl: reviewUrl('yelp', 'Kim Z.'),
    text: 'We had excellent, referral-worthy general plumbing work done by Eddie. He assessed the concerns with our faucet, tub spout and toilets and then returned the next day to repair them to perfection, at a fair price! Highly recommended.',
  },
  {
    reviewer: 'Jennifer B.',
    location: 'Hermosa Beach, CA',
    rating: 5,
    platform: 'yelp',
    date: new Date('2025-01-18'),
    verified: true,
    sourceUrl: reviewUrl('yelp', 'Jennifer B.'),
    text: "Sandoval recently did a job for me involving replacing a bath tub faucet that was causing squealing. I had another plumber come out and tell me I would need to spend 6x more to fix the issue. I'm so glad I went with Sandoval! He's fairly priced, responsive and is ethical in my experience. I am already using him for another job. Thank you, Sandoval!",
  },
  {
    reviewer: 'Ro S.',
    location: 'Chicago, IL',
    rating: 5,
    platform: 'yelp',
    date: new Date('2024-06-09'),
    verified: true,
    sourceUrl: reviewUrl('yelp', 'Ro S.'),
    text: "Highly recommend Sandoval's Plumbing. He is responsive and keeps you updated if he is running behind — which is important to me because who wants to sit around all day and wait. Fixed shower handle and installed a new kitchen faucet for $250-300. And all seems to be working great.",
  },
  {
    reviewer: 'Bailey C.',
    location: 'Evanston, IL',
    rating: 5,
    platform: 'yelp',
    date: new Date('2023-03-02'),
    verified: true,
    sourceUrl: reviewUrl('yelp', 'Bailey C.'),
    text: 'These reviews do not lie! This past Sunday after doing multiple loads of laundry back to back water started to come out of our basement shower. We called Sandoval Plumbing and Eddie answered right away. The next morning at 5:30 am it started pouring rain and our minor issue became a HUGE problem. Water was overflowing from our shower then it started to come out of the toilet. Eddie called back within 20 mins, arrived on time and knew what he had to do. Our main line was backed up and needed rodding, plus our sump pump needed to be changed. Eddie is extremely knowledgeable with 25 years of experience. He took his time to explain what the problem was. He was done in about 3 hrs and the price is reasonable.',
  },
  {
    reviewer: 'Jourdan S.',
    location: 'Chicago, IL',
    rating: 5,
    platform: 'yelp',
    date: new Date('2023-06-28'),
    verified: true,
    sourceUrl: reviewUrl('yelp', 'Jourdan S.'),
    text: "Eddie is THE BEST! Context, I'm a former plumber and didn't have my tools. Eddie (owner operator) not only showed up on time as promised, but his work is truly A1. He could have hacked my issue many different ways as most plumbers do. He didn't! He did it the right way and his craftsmanship is top notch. On top of that he's super professional and friendly. Wouldn't recommend another plumber in Chicago!",
  },
  {
    reviewer: 'Brian J.',
    location: 'Chicago, IL',
    rating: 5,
    platform: 'yelp',
    date: new Date('2023-11-16'),
    verified: true,
    sourceUrl: reviewUrl('yelp', 'Brian J.'),
    text: 'After my own completely failed attempt to clear a bathtub drain, we called Sandoval Plumbing. Eduardo showed up very quickly and promptly. The clog ended up being very difficult to clear and required extensive effort due to it being very far down the piping in a 100 year old building. As Eduardo spent more and more time battling our old pipes, very large dollar signs were going through my head. When he gave me the final price I was very pleasantly surprised by how extremely reasonable and fair the cost was.',
  },
  {
    reviewer: 'L S.',
    location: 'Naples, FL',
    rating: 5,
    platform: 'yelp',
    date: new Date('2024-02-10'),
    verified: true,
    sourceUrl: reviewUrl('yelp', 'L S.'),
    text: "Excellent service, quick response and professional. Replaced my kitchen faucet within 24 hours. He picked up the faucet and replaced it for me. I cannot tell you how much I appreciated the extra effort. If you need a plumber don't hesitate, you won't be sorry.",
  },
  {
    reviewer: 'Luciana T.',
    location: 'Chicago, IL',
    rating: 5,
    platform: 'yelp',
    date: new Date('2021-08-25'),
    verified: true,
    sourceUrl: reviewUrl('yelp', 'Lucian T '),
    text: 'We live in a one-bathroom condo, so when our toilet started a waterfall in the basement unit, we needed help... quick! Sandoval Plumbing was quick to respond and communicative throughout the entire process. Eddie was an expert who was efficient and thorough. More than that, when I asked what went wrong, he explained kindly and patiently. As a woman alone in the condo, I also felt very safe with Eddie.',
  },
  {
    reviewer: 'Chrysa L.',
    location: 'Chicago, IL',
    rating: 5,
    platform: 'yelp',
    date: new Date('2020-11-02'),
    verified: true,
    sourceUrl: reviewUrl('yelp', 'Chrysa '),
    text: "I live in a very, very old building with radiator heat. I had been having problems with mine not working efficiently and leaking. Eduardo came and did an inspection and laid out the problems with each of my radiators. He knew right away what issues needed to be fixed. He really knows his way around the old radiators and his prices are very reasonable. I have peace of mind knowing that I have the name and number of a skilled plumber like Eduardo who won't rip me off.",
  },
  {
    reviewer: 'Brian M.',
    location: 'Chicago, IL',
    rating: 5,
    platform: 'yelp',
    date: new Date('2020-11-03'),
    verified: true,
    sourceUrl: reviewUrl('yelp', 'Brian M '),
    text: "We had a nagging problem with a leaking faucet that I tried to fix myself and finally had to call a pro. Eduardo was great — he was flexible with his schedule, kept me informed and arrived when he said he would. He addressed the problem right away, worked quickly and solved our problem at a reasonable price. I've used other plumbers in the past and the quality of his work and his responsiveness stand out.",
  },
  {
    reviewer: 'Stevan D.',
    location: 'Highland Park, IL',
    rating: 5,
    platform: 'yelp',
    date: new Date('2021-09-23'),
    verified: true,
    sourceUrl: reviewUrl('yelp', 'Stevan D'),
    text: 'Eduardo did an excellent job with several plumbing projects! He changed the spout on a tub, repaired pipes and leaks on a couple sinks, and installed a new faucet. I am very satisfied with his work! He is fast, professional, and tells you exactly what you need.',
  },
];
