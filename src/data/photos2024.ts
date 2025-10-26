/**
 * 2024 Dive Barn Festival Photo Index
 * Year One - October 2024
 * Total photos: 13
 */

export interface Photo2024 {
  id: string;
  filename: string;
  url: string;
  photographer: 'unknown'; // Add photographer names if known
  categories: string[];
  caption: string;
  year: 2024;
}

export const photos2024: Photo2024[] = [
  {
    id: "2024-001",
    filename: "art_installation-1.JPG",
    url: "/media/year-one/full/art_installation-1.JPG",
    photographer: "unknown",
    categories: ["art_installation"],
    caption: "Art installation from Dive Barn 2024",
    year: 2024,
  },
  {
    id: "2024-002",
    filename: "art_installation-2.JPG",
    url: "/media/year-one/full/art_installation-2.JPG",
    photographer: "unknown",
    categories: ["art_installation"],
    caption: "Art installation from Dive Barn 2024",
    year: 2024,
  },
  {
    id: "2024-003",
    filename: "art_installation-3.JPG",
    url: "/media/year-one/full/art_installation-3.JPG",
    photographer: "unknown",
    categories: ["art_installation"],
    caption: "Art installation from Dive Barn 2024",
    year: 2024,
  },
  {
    id: "2024-004",
    filename: "art_installation-4.JPG",
    url: "/media/year-one/full/art_installation-4.JPG",
    photographer: "unknown",
    categories: ["art_installation"],
    caption: "Art installation from Dive Barn 2024",
    year: 2024,
  },
  {
    id: "2024-005",
    filename: "art_installation-5.JPG",
    url: "/media/year-one/full/art_installation-5.JPG",
    photographer: "unknown",
    categories: ["art_installation"],
    caption: "Art installation from Dive Barn 2024",
    year: 2024,
  },
  {
    id: "2024-006",
    filename: "art_installation-6.JPG",
    url: "/media/year-one/full/art_installation-6.JPG",
    photographer: "unknown",
    categories: ["art_installation"],
    caption: "Art installation from Dive Barn 2024",
    year: 2024,
  },
  {
    id: "2024-007",
    filename: "art_installation-7.JPG",
    url: "/media/year-one/full/art_installation-7.JPG",
    photographer: "unknown",
    categories: ["art_installation"],
    caption: "Art installation from Dive Barn 2024",
    year: 2024,
  },
  {
    id: "2024-008",
    filename: "community_moments-1.JPG",
    url: "/media/year-one/full/community_moments-1.JPG",
    photographer: "unknown",
    categories: ["community_moments"],
    caption: "Community gathering from Dive Barn 2024",
    year: 2024,
  },
  {
    id: "2024-009",
    filename: "community_moments-2.JPG",
    url: "/media/year-one/full/community_moments-2.JPG",
    photographer: "unknown",
    categories: ["community_moments"],
    caption: "Community gathering from Dive Barn 2024",
    year: 2024,
  },
  {
    id: "2024-010",
    filename: "community_moments-3.JPG",
    url: "/media/year-one/full/community_moments-3.JPG",
    photographer: "unknown",
    categories: ["community_moments"],
    caption: "Community gathering from Dive Barn 2024",
    year: 2024,
  },
  {
    id: "2024-011",
    filename: "community_moments-4.JPG",
    url: "/media/year-one/full/community_moments-4.JPG",
    photographer: "unknown",
    categories: ["community_moments"],
    caption: "Community gathering from Dive Barn 2024",
    year: 2024,
  },
  {
    id: "2024-012",
    filename: "morning_camping-1.JPG",
    url: "/media/year-one/full/morning_camping-1.JPG",
    photographer: "unknown",
    categories: ["morning_camping", "nature_landscape"],
    caption: "Morning camping scenes from Dive Barn 2024",
    year: 2024,
  },
  {
    id: "2024-013",
    filename: "morning_camping-2.JPG",
    url: "/media/year-one/full/morning_camping-2.JPG",
    photographer: "unknown",
    categories: ["morning_camping", "nature_landscape"],
    caption: "Morning camping scenes from Dive Barn 2024",
    year: 2024,
  },
];

/**
 * Get all photos by a specific category
 */
export function getPhotosByCategory2024(category: string): Photo2024[] {
  return photos2024.filter(photo => photo.categories.includes(category));
}

/**
 * Get all unique categories
 */
export function getAllCategories2024(): string[] {
  const categories = new Set<string>();
  photos2024.forEach(photo => {
    photo.categories.forEach(cat => categories.add(cat));
  });
  return Array.from(categories).sort();
}
