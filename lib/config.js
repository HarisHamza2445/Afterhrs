export const config = {
  brand: {
    name: "AFTERHRS",
    founded: "July 2026",
    tagline: "Independent streetwear. Distinctive graphics. No ordinary uniform.",
    statement:
      "Independent streetwear for the hours that belong to you. Original graphics, designed in-house, released in small drops.",
  },
  announcement: ["The first drop — discover AFTERHRS", "Questions about sizing? Ask us on WhatsApp"],
  contact: {
    whatsappNumber: "+91XXXXXXXXXX",
    email: "hello@afterhrs.example",
    supportHours: "Mon–Sat, 11:00–19:00 IST",
  },
  social: {
    instagramUrl: "",
    instagramHandle: "@afterhrs",
  },
  pricing: {
    currency: "INR",
    locale: "en-IN",
    pricesConfirmed: false,
  },
  shipping: {
    dispatchDays: [1, 3],
    flatRate: 99,
    freeShippingThreshold: null,
    regions: [
      {
        name: "North India",
        prefixes: ["1", "2"],
        days: [2, 4],
      },
      {
        name: "West India",
        prefixes: ["3", "4"],
        days: [3, 5],
      },
      {
        name: "South India",
        prefixes: ["5", "6"],
        days: [4, 6],
      },
      {
        name: "East & North-East India",
        prefixes: ["7", "8"],
        days: [4, 7],
      },
    ],
    unserviceablePrefixes: ["9"],
  },
  payments: {
    onlineEnabled: false,
    provider: "Razorpay",
    publicKeyId: "",
    codEnabled: false,
    codFee: 0,
  },
  discountCodes: {
    PREVIEW10: {
      type: "percent",
      value: 10,
      label: "Preview code (demo)",
      demo: true,
    },
  },
  returns: {
    windowDays: 7,
    exchangesOffered: true,
    refundsOffered: false,
    reviewed: false,
  },
  backend: {
    ordersApiUrl: "",
    newsletterApiUrl: "",
  },
};

export const whatsappPending = () =>
  !/^\+?\d{10,15}$/.test(config.contact.whatsappNumber.replace(/[\s-]/g, ""));
