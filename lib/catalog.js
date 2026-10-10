export const SIZES = ["S", "M", "L", "XL", "XXL"];

export const PRODUCTS = [
  {
    id: "floral-cat-tee",
    name: "Floral Cat Tee",
    fullName: "Afterhrs Floral Cat Tee",
    status: "available",
    price: 1299,
    colours: [
      {
        name: "Black",
        hex: "#1a1a1a",
      },
    ],
    sizes: SIZES,
    soldOut: [],
    collections: ["graphic-tees", "drop-01"],
    tone: "dark",
    images: {
      main: "/img/cat-tee.webp",
      alt: "/img/cat-tee-alt.webp",
      cut: "/img/cat-tee-cut.webp",
      art: "/img/art-cat.webp",
    },
    gallery: [
      {
        src: "/img/cat-tee.webp",
        label: "Back",
      },
      {
        src: "/img/cat-tee-cut.webp",
        label: "Back · studio",
        stage: true,
      },
      {
        src: "/img/art-cat.webp",
        label: "Print artwork",
      },
      {
        src: "/img/art-cat-face.webp",
        label: "Print detail",
      },
    ],
    short: "A black cat watches from a dense field of red and ivory blooms.",
    description:
      "The first AFTERHRS print. A black cat sits still inside a crowded field of red and ivory flowers, drawn in a woodcut-inspired style and printed as a full back panel on a washed black oversized tee.",
    design: "Large back print. Original artwork designed in-house by AFTERHRS.",
    fit: "Oversized silhouette with dropped shoulders.",
    fabric: null,
    gsm: null,
    printMethod: null,
    tags: ["cat", "floral", "black", "graphic", "flowers"],
  },
  {
    id: "floral-eyes-tee",
    name: "Floral Eyes Tee",
    fullName: "Afterhrs Floral Eyes Tee",
    status: "available",
    price: 1299,
    colours: [
      {
        name: "Ivory",
        hex: "#efebe2",
      },
    ],
    sizes: SIZES,
    soldOut: [],
    collections: ["graphic-tees", "drop-01"],
    tone: "light",
    images: {
      main: "/img/eyes-tee.webp",
      alt: "/img/eyes-tee-alt.webp",
      cut: "/img/eyes-tee-cut.webp",
      art: "/img/art-eyes.webp",
    },
    gallery: [
      {
        src: "/img/eyes-tee.webp",
        label: "Back",
      },
      {
        src: "/img/eyes-tee-cut.webp",
        label: "Back · studio",
        stage: true,
      },
      {
        src: "/img/art-eyes.webp",
        label: "Print artwork",
        wide: true,
      },
      {
        src: "/img/eyes-tee-alt.webp",
        label: "Back · alternate",
      },
    ],
    short: "Only the eyes. A narrow floral band across an ivory tee.",
    description:
      "The same black cat, cropped down to a glance. A narrow strip of red and ivory flowers runs across the shoulders and leaves just the eyes looking back. A quieter way to wear the first drop.",
    design: "Horizontal back print across the upper back.",
    fit: "Oversized silhouette with dropped shoulders.",
    fabric: null,
    gsm: null,
    printMethod: null,
    tags: ["cat", "eyes", "floral", "ivory", "white", "graphic"],
  },
  {
    id: "tiger-graphic-tee",
    name: "Tiger Graphic Tee",
    fullName: "Afterhrs Tiger Graphic Tee",
    status: "available",
    price: 1299,
    colours: [
      {
        name: "Ivory",
        hex: "#efebe2",
      },
    ],
    sizes: SIZES,
    soldOut: [],
    collections: ["graphic-tees", "drop-01"],
    tone: "light",
    images: {
      main: "/img/tiger-tee.webp",
      alt: "/img/art-tiger.webp",
      cut: "/img/tiger-tee-cut.webp",
      art: "/img/art-tiger.webp",
    },
    gallery: [
      {
        src: "/img/tiger-tee.webp",
        label: "Back",
      },
      {
        src: "/img/tiger-tee-cut.webp",
        label: "Back · studio",
        stage: true,
      },
      {
        src: "/img/art-tiger.webp",
        label: "Print artwork",
      },
    ],
    short: "An engraved tiger portrait, signed with the AFTERHRS mark.",
    description:
      "A tiger in profile, drawn line by line in the manner of an old engraving, with the lowercase afterhrs signature and four-point star set beneath it. Monochrome on ivory.",
    design: "Back print with signature wordmark and star.",
    fit: "Oversized silhouette with dropped shoulders.",
    fabric: null,
    gsm: null,
    printMethod: null,
    tags: ["tiger", "ivory", "white", "engraving", "graphic"],
  },
  {
    id: "signature-tee",
    name: "Signature Tee",
    fullName: "Afterhrs Signature Tee",
    status: "concept",
    price: 1299,
    colours: [
      {
        name: "Black",
        hex: "#1a1a1a",
      },
    ],
    sizes: SIZES,
    soldOut: [],
    collections: ["essential-tees"],
    tone: "dark",
    images: {
      main: "/img/sig-tee.webp",
      alt: "/img/signature-ink-light.webp",
      cut: "/img/sig-tee-cut.webp",
      art: "/img/signature-ink-light.webp",
    },
    gallery: [
      {
        src: "/img/sig-tee.webp",
        label: "Concept render",
      },
      {
        src: "/img/sig-tee-cut.webp",
        label: "Concept · studio",
        stage: true,
      },
    ],
    short: "The brush-script signature. Concept piece, not yet in production.",
    description:
      "The AFTERHRS signature in a fast brush script, finished with the four-point star. This piece is a concept. Final product photography, price and release timing will be confirmed before it goes on sale.",
    design: "Back print, signature wordmark.",
    fit: "To be confirmed.",
    fabric: null,
    gsm: null,
    printMethod: null,
    tags: ["signature", "logo", "black", "wordmark", "script"],
  },
];

export const COLLECTIONS = [
  {
    id: "graphic-tees",
    name: "Graphic Tees",
    live: true,
    blurb: "Original artwork, printed large. The core of every drop.",
    image: "/img/art-cat.webp",
  },
  {
    id: "drop-01",
    name: "New Arrivals",
    live: true,
    blurb: "Drop 01 — the first three designs from AFTERHRS.",
    image: "/img/art-tiger.webp",
  },
  {
    id: "essential-tees",
    name: "Essential Tees",
    live: false,
    blurb: "Signature basics carrying the AFTERHRS mark. In development.",
    image: "/img/signature-ink-light.webp",
  },
  {
    id: "limited-drops",
    name: "Limited Drops",
    live: false,
    blurb: "Small-run releases. Planned for after the first drop.",
    image: "/img/art-eyes.webp",
  },
];

export const getProduct = (e) => PRODUCTS.find((t) => t.id === e);

export const isAvailable = (e) => e && e.status === "available";
