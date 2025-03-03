import React from 'react';

/**
 * Sun Icon component
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.ariaLabel='Sun Icon'] - Accessibility label
 * @param {number} [props.width=24] - Width of the icon
 * @param {number} [props.height=24] - Height of the icon
 * @returns {JSX.Element} Sun Icon SVG
 */
export const SunIcon = ({ className, ariaLabel = 'Sun Icon', width = 24, height = 24 }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    aria-label={ariaLabel}
    role="img"
    width={width}
    height={height}
  >
    <title>{ariaLabel}</title>
    <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/>
  </svg>
);

/**
 * Moon Icon component
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.ariaLabel='Moon Icon'] - Accessibility label
 * @param {number} [props.width=24] - Width of the icon
 * @param {number} [props.height=24] - Height of the icon
 * @returns {JSX.Element} Moon Icon SVG
 */
export const MoonIcon = ({ className, ariaLabel = 'Moon Icon', width = 24, height = 24 }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    aria-label={ariaLabel}
    role="img"
    width={width}
    height={height}
  >
    <title>{ariaLabel}</title>
    <path d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.98 6.98 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"/>
  </svg>
);

// تحسين الأداء باستخدام React.memo
export const MemoizedSunIcon = React.memo(SunIcon);
export const MemoizedMoonIcon = React.memo(MoonIcon);
