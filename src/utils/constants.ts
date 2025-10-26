import type { SiteConfig, EventInfo, VenueInfo } from '../types';

export const SITE_CONFIG: SiteConfig = {
  title: 'Dive Barn 2025 - Annual Arts Festival',
  description: 'An arts and music gathering on a ranch in Mendocino County',
  url: 'https://divebarn.com',
  image: '/images/dive-barn-social.jpg'
};

export const EVENT_INFO: EventInfo = {
  name: 'Dive Barn 2025',
  date: '2025-10-11',
  startTime: '12:00',
  endTime: '23:00',
  location: 'Yorkville Schoolhouse Ranch, Mendocino County',
  description: 'An arts and music gathering on a ranch in Mendocino County'
};

export const VENUE_INFO: VenueInfo = {
  name: 'Yorkville Schoolhouse Ranch',
  address: 'Mendocino County, CA',
  description: 'A property stewarded by the Henderson/Carlson family',
  amenities: [
    'Outdoor stages',
    'Food vendors',
    'Art installations',
    'Parking',
    'Restrooms',
    'Water stations'
  ]
};

export const SOCIAL_LINKS = {
  rsvp: 'https://partiful.com/e/Ft3EJk5f8OUREaoQKtBo',
  instagram: '',
  facebook: '',
  email: ''
};

export const NAVIGATION_LINKS = [
  { href: '/#barn', label: 'Thank You' },
  { href: '/#whats-next', label: "What's Next" },
  { href: '/#faq', label: 'FAQ' }
];

export const ARTISTS = [
  {
    type: 'section',
    name: 'Artists'
  },
  {
    name: 'Selby Sohn',
    instagram: 'https://www.instagram.com/selbysohn/',
    website: 'http://selbysohn.com/?fbclid=PAZXh0bgNhZW0CMTEAAadFAR_YAuRf8IxTwbgtjhtnNsfe0Fsue_SLqPiOSsEpKjH7AT1uafkY-EUN4A_aem_uYdJiRNyUNpKufdsCucAig'
  },
  {
    name: 'Mary Graham',
    instagram: 'https://www.instagram.com/mary.graham.art/',
    website: 'https://marydgraham.com/?fbclid=PAZXh0bgNhZW0CMTEAAad9a9j7BMONa-hZyIor4a6r8T8BE-S3ntryeR1b7aHUJsLCAT5heXnfDEQsUA_aem_QuJ4FD7DHeae-sYQ16nMkA'
  },
  {
    name: 'Dana Morrison',
    instagram: 'https://www.instagram.com/dana.r.morrison/',
    website: 'http://www.danamorrison.com/?fbclid=PAZXh0bgNhZW0CMTEAAafio4-R1L2YIESJ75q4Fem_lqe8ofXlxl0nDrE5NfaLqU1U4VPj-nUrPxufzw_aem_E3cYwZlDDLvedUV3Dl7l1Q'
  },
  {
    name: 'Reniel Del Rosario',
    instagram: 'https://www.instagram.com/adrenieline/',
    website: 'https://www.renieldelrosario.com/?fbclid=PAZXh0bgNhZW0CMTEAAacRpuhcFz6Y4q2DwXGS9qe9PDUumXTLJ192sByV6eSZtA92SCGPUROlWaXRgg_aem_3aU3I6BuwvZTY09_Tb9_eA'
  },
  {
    name: 'Hudson Hatfield',
    instagram: 'https://www.instagram.com/hudsonbupson/',
    website: null
  },
  {
    name: 'Helia Pouyanfar',
    instagram: 'https://www.instagram.com/heliapouyanfar/',
    website: 'https://heliapouyanfar.com/?fbclid=PAZXh0bgNhZW0CMTEAAaer4eH_Yi2G5ALALkQhqV6Nj0hz3ig_fFBNxPH92eThD3QAfYaWs5ch_R_DMg_aem_x64aSiYr-zdEJmr7sDSDkw'
  },
  {
    name: 'Kelley O\'Leary',
    instagram: 'https://www.instagram.com/kelley__oleary/',
    website: 'https://kelleyoleary.com/?fbclid=PAZXh0bgNhZW0CMTEAAafTutLYUHBIyRq25m8CHK8U7vLhcA0L2ToJr9hwoCco9vQXBSE4OmVpVGxixw_aem_jLFRS2wMlEb9DCWGEDIbQg'
  },
  {
    name: 'Kevin Lopez Pardillo',
    instagram: 'https://www.instagram.com/rhythmkeaven/',
    website: 'https://lopezpardillo.com/home.html?fbclid=PAZXh0bgNhZW0CMTEAAacRwSCJfh6_PxXkBZFfr5ER-_Ic61ivUI0FQBYNGvTFC5XST4m94Qvaeq70jg_aem_-hff1-age66ktwk3d6LFYw'
  },
  {
    name: 'Sylvia Hughes-Gonzales',
    instagram: 'https://www.instagram.com/sylvia.hu_go/',
    website: 'https://www.sylviahughesgonzales.com/'
  },
  {
    type: 'section',
    name: 'Musicians'
  },
  {
    name: 'Manuel Calderón Martínez',
    instagram: 'https://www.instagram.com/manmamusic/',
    website: 'https://manuelmartinezmusic.com/?fbclid=PAZXh0bgNhZW0CMTEAAaczRlo08MUEOxEk8WRgARt-01VKVRLIkDrmdKtJCTtXUKKQ3IES6mnR7tHNog_aem_57DkkjMJ1KBsviVrCupkyQ'
  },
  {
    name: 'Esther',
    instagram: 'https://www.instagram.com/enchi.wang/',
    website: null
  },
  {
    name: 'Paul',
    instagram: 'https://www.instagram.com/chromasea?igsh=NTc4MTIwNjQ2YQ==',
    website: null
  },
  {
    name: 'Good Actor',
    instagram: 'https://www.instagram.com/goodactorfanclub/?hl=en',
    website: null
  },
  {
    name: 'Town Bully',
    instagram: 'https://www.instagram.com/townbullysf/?hl=en',
    website: null
  }
];