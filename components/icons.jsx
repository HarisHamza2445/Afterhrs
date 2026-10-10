"use client";
const Icon = ({ children, size = 20, className = "", ...l }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
    className={"icon " + className}
    aria-hidden="true"
    {...l}
  >
    {children}
  </svg>
);

export const IconSearch = (e) => (
  <Icon {...e}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5 21 21" />
  </Icon>
);

export const IconUser = (e) => (
  <Icon {...e}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.2-4 4.2-6 8-6s6.8 2 8 6" />
  </Icon>
);

export const IconHeart = ({ filled, ...t }) => (
  <Icon {...t}>
    <path
      d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z"
      fill={filled ? "currentColor" : "none"}
      strokeLinejoin="round"
    />
  </Icon>
);

export const IconBag = (e) => (
  <Icon {...e}>
    <path d="M4.5 8h15l-1 13h-13z" strokeLinejoin="round" />
    <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" />
  </Icon>
);

export const IconMenu = (e) => (
  <Icon {...e}>
    <path d="M3 8h18M3 16h12" />
  </Icon>
);

export const IconClose = (e) => (
  <Icon {...e}>
    <path d="M5 5l14 14M19 5 5 19" />
  </Icon>
);

export const IconArrow = (e) => (
  <Icon {...e}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Icon>
);

export const IconArrowDown = (e) => (
  <Icon {...e}>
    <path d="M12 4v16M6 14l6 6 6-6" />
  </Icon>
);

export const IconPlus = (e) => (
  <Icon {...e}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const IconZoom = (e) => (
  <Icon {...e}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5 21 21M10.5 7.5v6M7.5 10.5h6" />
  </Icon>
);

export const IconCheck = (e) => (
  <Icon {...e}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Icon>
);

export const IconTruck = (e) => (
  <Icon {...e}>
    <path d="M2.5 6.5h11v10h-11zM13.5 10h4.5l3.5 3.5v3h-8" />
    <circle cx="6.5" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </Icon>
);

export const IconRuler = (e) => (
  <Icon {...e}>
    <path d="M3 15.5 15.5 3 21 8.5 8.5 21z" />
    <path d="m7 11.5 2 2M10 8.5l2 2M13 5.5l2 2" />
  </Icon>
);

export const IconPencil = (e) => (
  <Icon {...e}>
    <path d="M4 20l1-5L16 4l4 4L9 19z" strokeLinejoin="round" />
    <path d="M13.5 6.5l4 4" />
  </Icon>
);

export const IconCopy = (e) => (
  <Icon {...e}>
    <rect x="8" y="8" width="12" height="12" />
    <path d="M16 8V4H4v12h4" />
  </Icon>
);

export const IconLock = (e) => (
  <Icon {...e}>
    <rect x="5" y="11" width="14" height="9" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </Icon>
);

export const IconInfo = (e) => (
  <Icon {...e}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v6M12 7.5v.5" />
  </Icon>
);

export const IconWhatsApp = ({ size = 22, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={"icon " + className}
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.23 3.7 8.23 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);

export const IconInstagram = (e) => (
  <Icon {...e}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
  </Icon>
);
