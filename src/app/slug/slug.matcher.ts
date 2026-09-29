import { UrlMatcher, UrlSegment } from '@angular/router';

export const slugMatcher: UrlMatcher = (segments) => {
  // Match single segment URLs that end with -digits$$suffix (e.g., user-123$$preview, user-123$$1251, user-123$$abc)
  if (segments.length === 1) {
    const path = segments[0].path;
    // Match pattern: slug ending with -digits, then $$, then any suffix
    const match = path.match(/^([a-z0-9._-]+-\d+)\$\$(.+)$/i);
    if (match) {
      return {
        consumed: segments,
        posParams: {
          slug: new UrlSegment(match[1], {}),
          suffix: new UrlSegment(match[2], {})
        }
      };
    }
    // Regular slug pattern without $$suffix (must end with -digits)
    if (/^[a-z0-9._-]+-\d+$/i.test(path)) {
      return {
        consumed: segments,
        posParams: {
          slug: new UrlSegment(path, {}),
          suffix: new UrlSegment('', {})
        }
      };
    }
  }
  return null;
};
