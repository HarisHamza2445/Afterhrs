"use client";
const STAR_PATH =
  "M0,-12 C0.9,-3.2 2.6,-1 8,0 C2.6,1 0.9,3.2 0,12 C-0.9,3.2 -2.6,1 -8,0 C-2.6,-1 -0.9,-3.2 0,-12Z";

export function Star({ size = 14, className = "", title }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="-12 -12 24 24"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title && <title>{title}</title>}
      <path d={STAR_PATH} fill="currentColor" />
    </svg>
  );
}

const MONOGRAM_SVG = `
  <polygon points="18.6,2.2 21.6,2.2 35.2,45.2 27.6,45.2" />
  <polygon points="19.2,2.2 20.2,2.2 7.4,45.2 6.2,45.2" />
  <rect x="1.8" y="45" width="10.2" height="1.1" />
  <rect x="23.6" y="45" width="15.6" height="1.1" />
  <path transform="translate(20.9 31.4) scale(0.42)" d="${STAR_PATH}" />
`;

export function Monogram({ size = 30, className = "", label = "AFTERHRS" }) {
  return (
    <svg
      className={className}
      width={size * (41 / 48)}
      height={size}
      viewBox="0 0 41 48"
      role="img"
      aria-label={label}
      fill="currentColor"
      dangerouslySetInnerHTML={{
        __html: MONOGRAM_SVG,
      }}
    />
  );
}

export function Wordmark({ className = "", size, as: Tag = "span" }) {
  return (
    <Tag
      className={"wordmark " + className}
      style={
        size
          ? {
              fontSize: size,
            }
          : undefined
      }
      aria-label="AFTERHRS"
    >
      <span className="wordmark__type" aria-hidden="true">
        AFTERHRS
      </span>
      <Star className="wordmark__star" size={12} />
    </Tag>
  );
}

export function Lockup({ className = "" }) {
  return (
    <span className={"lockup " + className}>
      <Monogram size={44} />
      <span className="lockup__rule" aria-hidden="true" />
      <Wordmark />
    </span>
  );
}
