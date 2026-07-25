export const SITE_NAME = "Sho8lana";
export const SITE_NAME_AR = "شغلانة";
export const SITE_DESCRIPTION =
  "ابحث عن شغلك في ثواني — اكتب المسمى الوظيفي والمحافظة وشغلانة تعرضلك أقرب الشركات اللي بتوظف.";

export const STORAGE_KEYS = {
  SEARCH_HISTORY: "sho8lana:search-history",
  FAVORITES: "sho8lana:favorites",
  THEME: "sho8lana:theme",
} as const;

export const MAX_HISTORY_ITEMS = 8;
export const RESULTS_PAGE_SIZE = 12;

export const DEFAULT_FILTERS = {
  minRating: 0,
  hasWebsite: false,
  hasPhone: false,
  sortBy: "rating" as const,
};
