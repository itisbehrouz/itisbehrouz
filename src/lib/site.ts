/** Canonical site origin. Single source of truth for absolute URLs. */
export const SITE_URL = "https://behruzbagirzade.com";

export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
