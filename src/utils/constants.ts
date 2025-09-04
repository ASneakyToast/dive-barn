import type { SiteConfig, EventInfo, VenueInfo } from '../types';

export const SITE_CONFIG: SiteConfig = {
  title: 'Dive Barn 2025 - Annual Arts Festival',
  description: 'An arts and music gathering on a ranch in Mendocino County',
  url: 'https://divebarn.org',
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
  { href: '/', label: 'Home' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/yorkville-schoolhouse-ranch', label: 'Venue' },
  { href: '/financial-transparency', label: 'Transparency' }
];