import type { TechnologyId } from '../data/catalog';

interface IconProps {
  id: TechnologyId;
  className?: string;
}

export function TechnologyLogo({ id, className = 'h-8 w-8' }: IconProps) {
  switch (id) {
    case 'kotlin':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path d="M4 4H28L16 16L28 28H4V4Z" fill="#7F52FF" />
          <path d="M4 4H16.5L4 16.5V4Z" fill="#C711E1" fillOpacity="0.45" />
        </svg>
      );

    case 'java':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path
            d="M12.5 5.5C14.5 7.5 11.5 9.8 13.8 11.8M17.5 4.5C19.6 6.8 16.5 9.2 18.8 11.5"
            stroke="#EA580C"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M8 14.5H21.5V19.5C21.5 22.8 18.6 25 14.75 25C10.9 25 8 22.8 8 19.5V14.5Z"
            stroke="#B45309"
            strokeWidth="2"
            fill="#F59E0B"
            fillOpacity="0.18"
          />
          <path
            d="M21.5 15.5H23.5C24.9 15.5 26 16.6 26 18C26 19.4 24.9 20.5 23.5 20.5H21.5"
            stroke="#B45309"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M7 27.5H23"
            stroke="#1E40AF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'react-native':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <circle cx="16" cy="16" r="2.6" fill="#0284C7" />
          <ellipse
            cx="16"
            cy="16"
            rx="12"
            ry="4.8"
            stroke="#0284C7"
            strokeWidth="1.75"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="12"
            ry="4.8"
            transform="rotate(60 16 16)"
            stroke="#0284C7"
            strokeWidth="1.75"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="12"
            ry="4.8"
            transform="rotate(120 16 16)"
            stroke="#0284C7"
            strokeWidth="1.75"
          />
        </svg>
      );

    case 'flutter':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path d="M17.8 4L6 15.8L9.6 19.4L25 4H17.8Z" fill="#38BDF8" />
          <path d="M17.8 14.8L11.4 21.2L17.8 27.6H25L18.6 21.2L25 14.8H17.8Z" fill="#0284C7" />
          <path d="M11.4 21.2L15 17.6L18.6 21.2L15 24.8L11.4 21.2Z" fill="#0369A1" />
        </svg>
      );

    case 'javascript':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="4" fill="#EAB308" />
          <path
            d="M15.2 15.5V22.4C15.2 24.1 14.1 25 12.6 25C11.4 25 10.6 24.4 10.1 23.5"
            stroke="#1C1917"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <path
            d="M23.5 16.7C23 15.9 22.1 15.5 21 15.5C19.4 15.5 18.4 16.4 18.4 17.6C18.4 18.9 19.3 19.4 21 20C22.7 20.6 23.8 21.2 23.8 22.7C23.8 24.1 22.6 25 20.8 25C19.3 25 18.2 24.4 17.6 23.4"
            stroke="#1C1917"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'html':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path
            d="M6 5H26L24.2 24.4L16 27L7.8 24.4L6 5Z"
            fill="#EA580C"
          />
          <path
            d="M21 10.5H11L11.4 15H20.5L19.9 21L16 22.2L12.1 21L11.8 18.2"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'css':
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path
            d="M6 5H26L24.2 24.4L16 27L7.8 24.4L6 5Z"
            fill="#2563EB"
          />
          <path
            d="M11 10.5H21L20.4 15H12.5M20.4 15L19.9 21L16 22.2L12.1 21L11.8 18.4"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
