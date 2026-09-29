import { UrlMatcher, UrlSegment } from '@angular/router';

export function activateMatcher(url: UrlSegment[]) {
  if (url.length && url[0].path.startsWith('activate_')) {
    const data = url[0].path.replace('activate_', '');
    return {
      consumed: url,
      posParams: { data: new UrlSegment(data, {}) }
    };
  }
  return null;
}
