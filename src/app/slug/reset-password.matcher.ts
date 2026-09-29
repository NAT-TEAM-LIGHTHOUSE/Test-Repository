import { UrlSegment, UrlMatchResult } from '@angular/router';

/**
 * Custom matcher for reset password routes with slugs like 'fp_' or 'cfp_'.
 * Usage: In your route config, use matcher: resetPasswordMatcher
 */
export function resetPasswordMatcher(url: UrlSegment[]): UrlMatchResult | null {
  if ((url.length && url[0].path.startsWith('fp_')) || (url.length && url[0].path.startsWith('cfp_'))) {
    let data: any;
    if (url[0].path.startsWith('fp_')) {
      // data = url[0].path.replace('fp_', '');
      data = url[0].path;
    } else {
      // data = url[0].path.replace('cfp_', '');
      data = url[0].path;
    }
    return {
      consumed: url,
      posParams: { data: new UrlSegment(data, {}) }
    };
  }
  return null;
}
