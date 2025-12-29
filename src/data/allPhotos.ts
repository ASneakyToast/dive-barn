/**
 * Combined Photo Archive for All Years
 * Combines 2024 and 2025 festival photos
 */

import photos2024Data from './photos/2024.json';
import photos2025Data from './photos/2025.json';

// Photo interfaces for type safety
export interface Photo2024 {
  id: string;
  filename: string;
  url: string;
  photographer: 'katherine-jemima-hamilton';
  categories: string[];
  caption: string;
  year: 2024;
}

export interface Photo2025 {
  id: string;
  filename: string;
  url: string;
  photographer: 'dana-morrison' | 'joseph-blake';
  categories: string[];
  caption: string;
  year: 2025;
}

// Unified photo interface
export interface ArchivePhoto {
  id: string;
  filename: string;
  url: string;
  photographer: string;
  categories: string[];
  caption: string;
  year: 2024 | 2025;
}

// Type assertions for imported JSON data
const photos2024 = photos2024Data as Photo2024[];
const photos2025 = photos2025Data as Photo2025[];

// Convert and combine all photos
export const allPhotos: ArchivePhoto[] = [
  ...photos2024.map(photo => ({
    ...photo,
    photographer: photo.photographer as string,
  })),
  ...photos2025.map(photo => ({
    ...photo,
    photographer: photo.photographer as string,
  })),
];

/**
 * Get photos filtered by year
 */
export function getPhotosByYear(year: 2024 | 2025): ArchivePhoto[] {
  return allPhotos.filter(photo => photo.year === year);
}

/**
 * Get photos filtered by years (supports multiple)
 */
export function getPhotosByYears(years: (2024 | 2025)[]): ArchivePhoto[] {
  return allPhotos.filter(photo => years.includes(photo.year));
}

/**
 * Get photos filtered by category
 */
export function getPhotosByCategory(category: string): ArchivePhoto[] {
  return allPhotos.filter(photo => photo.categories.includes(category));
}

/**
 * Get photos filtered by photographer
 */
export function getPhotosByPhotographer(photographer: string): ArchivePhoto[] {
  return allPhotos.filter(photo => photo.photographer === photographer);
}

/**
 * Get all unique categories across all years
 */
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  allPhotos.forEach(photo => {
    photo.categories.forEach(cat => categories.add(cat));
  });
  return Array.from(categories).sort();
}

/**
 * Get all unique photographers across all years
 */
export function getAllPhotographers(): string[] {
  const photographers = new Set<string>();
  allPhotos.forEach(photo => photographers.add(photo.photographer));
  return Array.from(photographers).sort();
}

/**
 * Get all unique years
 */
export function getAllYears(): number[] {
  const years = new Set<number>();
  allPhotos.forEach(photo => years.add(photo.year));
  return Array.from(years).sort();
}

/**
 * Advanced filtering
 */
export interface PhotoFilters {
  years?: (2024 | 2025)[];
  categories?: string[];
  photographers?: string[];
  searchQuery?: string;
}

export function filterPhotos(filters: PhotoFilters): ArchivePhoto[] {
  let filtered = [...allPhotos];

  // Filter by years
  if (filters.years && filters.years.length > 0) {
    filtered = filtered.filter(photo => filters.years!.includes(photo.year));
  }

  // Filter by categories (OR logic - photo has at least one of the categories)
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(photo =>
      filters.categories!.some(cat => photo.categories.includes(cat))
    );
  }

  // Filter by photographers
  if (filters.photographers && filters.photographers.length > 0) {
    filtered = filtered.filter(photo =>
      filters.photographers!.includes(photo.photographer)
    );
  }

  // Filter by search query
  if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(photo =>
      photo.caption.toLowerCase().includes(query) ||
      photo.filename.toLowerCase().includes(query) ||
      photo.categories.some(cat => cat.toLowerCase().includes(query))
    );
  }

  return filtered;
}
