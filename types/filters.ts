export type FilterResponse = {
  filters?: Filters;
  error: boolean; // If the prompt is not parseable, set this to true
};

// If a specific year is specified, startYear === endYear
export type Filters = {
  startYear?: number; // Start year, inclusive
  endYear?: number; // End year, inclusive
  genres?: string[]; // Capitalized
};
