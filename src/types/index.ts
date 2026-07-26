// ============================================================
// Core domain types for Sho8lana
// ============================================================

export interface Company {
  company_name: string;
  address: string;
  phone: string | null;
  website: string | null;
  rating: number | null;
  maps_url: string;
  latitude: string | number;
  longitude: string | number;
}

export interface SearchRequestBody {
  jobTitle: string;
  governorate: string;
}

export interface SearchApiResponse {
  success: boolean;
  count: number;
  cached: boolean;
  results: Company[];
  message?: string;
}

export interface SearchState {
  status: "idle" | "loading" | "success" | "error" | "empty";
  results: Company[];
  count: number;
  cached: boolean;
  error: string | null;
}

export interface SearchHistoryItem {
  id: string;
  jobTitle: string;
  governorate: string;
  timestamp: number;
}

export interface FavoriteCompany extends Company {
  favoritedAt: number;
  id: string;
}

export interface Governorate {
  value: string;
  ar: string;
  en: string;
}

export type SortOption = "rating" | "alphabetical";

export interface SearchFilters {
  minRating: number;
  hasWebsite: boolean;
  hasPhone: boolean;
  sortBy: SortOption;
}
