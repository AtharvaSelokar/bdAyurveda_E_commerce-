export type ProductIngredient = {
  name: string;
  image: string;
};

export type ProductFaq = {
  question: string;
  answer: string;
};

export type Product = {
  name: string;
  shortName: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number;
  badge: string;
  cover: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  benefits: string[];
  ingredients: ProductIngredient[];
  directions: string[];
  suitableFor: string[];
  faqs: ProductFaq[];
};

export const products: Product[] = [
  {
    name: "Advanced Hair Care Oil",
    shortName: "Hair Care Oil",
    slug: "hair-growth-oil",
    category: "Hair Wellness",
    price: 499,
    originalPrice: 599,
    badge: "Bestseller",
    cover: "/products/hair-growth-oil/cover.webp",
    gallery: [
      "/products/hair-growth-oil/cover.webp",
      "/products/hair-growth-oil/gallery-1.webp",
      "/products/hair-growth-oil/gallery-2.webp",
      "/products/hair-growth-oil/gallery-3.webp",
      "/products/hair-growth-oil/gallery-4.webp",
    ],
    shortDescription:
      "A thoughtfully formulated Ayurvedic hair oil for regular scalp nourishment and healthier-looking hair.",
    description:
      "Advanced Hair Care Oil brings traditional Ayurvedic hair-care ingredients into a simple modern routine. Its nourishing texture is designed for scalp massage and regular hair wellness without making the experience feel complicated.",
    benefits: [
      "Supports regular scalp nourishment",
      "Helps hair feel softer and healthier",
      "Suitable for a consistent weekly routine",
      "Made with selected Ayurvedic ingredients",
    ],
    ingredients: [
      { name: "Amla", image: "/ingredients/amla.webp" },
      { name: "Bhringraj", image: "/ingredients/bhringraj.webp" },
      { name: "Neem", image: "/ingredients/neem.webp" },
      { name: "Tulsi", image: "/ingredients/tulsi.webp" },
    ],
    directions: [
      "Take a suitable quantity of oil in your palm.",
      "Apply gently across the scalp and hair roots.",
      "Massage with fingertips for 5–10 minutes.",
      "Leave for the recommended duration and wash with a mild cleanser.",
    ],
    suitableFor: [
      "People building a regular scalp-care routine",
      "Dry or dull-looking hair",
      "Adults looking for Ayurvedic hair wellness",
    ],
    faqs: [
      {
        question: "How often should I use the hair oil?",
        answer:
          "Follow the usage directions printed on the product packaging. A consistent weekly routine is generally easier to maintain than irregular use.",
      },
      {
        question: "Can I leave the oil overnight?",
        answer:
          "Use it according to the directions on the label. If you have a sensitive scalp, begin with a shorter duration and discontinue use if irritation occurs.",
      },
      {
        question: "Is it suitable for all hair types?",
        answer:
          "Hair and scalp needs differ. Review the full ingredient list and perform a patch test before first use, particularly if you have known sensitivities.",
      },
    ],
  },
  {
    name: "Advanced Hair Care Serum",
    shortName: "Hair Care Serum",
    slug: "hair-growth-serum",
    category: "Hair Wellness",
    price: 549,
    originalPrice: 649,
    badge: "Popular",
    cover: "/products/hair-growth-serum/cover.webp",
    gallery: [
      "/products/hair-growth-serum/cover.webp",
      "/products/hair-growth-serum/gallery-1.webp",
      "/products/hair-growth-serum/gallery-2.webp",
      "/products/hair-growth-serum/gallery-3.webp",
      "/products/hair-growth-serum/gallery-4.webp",
    ],
    shortDescription:
      "A lightweight botanical serum designed to support smoother, healthier-looking hair.",
    description:
      "Advanced Hair Care Serum is designed for people who prefer a lightweight addition to their hair-care routine. It supports a smoother finish while helping hair look cared for and manageable.",
    benefits: [
      "Lightweight, non-heavy feel",
      "Supports smoother-looking hair",
      "Easy to include in a daily routine",
      "Complements regular hair-oil care",
    ],
    ingredients: [
      { name: "Amla", image: "/ingredients/amla.webp" },
      { name: "Bhringraj", image: "/ingredients/bhringraj.webp" },
      { name: "Neem", image: "/ingredients/neem.webp" },
    ],
    directions: [
      "Use the quantity recommended on the product label.",
      "Apply to the scalp or hair as directed.",
      "Massage or spread gently.",
      "Use consistently according to the recommended routine.",
    ],
    suitableFor: [
      "People preferring lightweight hair care",
      "Dry or rough-looking hair",
      "Adults building a simple everyday routine",
    ],
    faqs: [
      {
        question: "Can the serum be used with the hair oil?",
        answer:
          "Yes, they can form part of the same routine when used according to their respective directions.",
      },
      {
        question: "Will it feel sticky?",
        answer:
          "The serum is designed as a lighter product, but the experience depends on the amount used and individual hair type.",
      },
    ],
  },
  {
    name: "Pneumona Powder",
    shortName: "Pneumona Powder",
    slug: "pneumona-powder",
    category: "Respiratory Care",
    price: 399,
    originalPrice: 449,
    badge: "Herbal",
    cover: "/products/pneumona-powder/cover.webp",
    gallery: [
      "/products/pneumona-powder/cover.webp",
      "/products/pneumona-powder/gallery-1.webp",
      "/products/pneumona-powder/gallery-2.webp",
      "/products/pneumona-powder/gallery-3.webp",
      "/products/pneumona-powder/gallery-4.webp",
    ],
    shortDescription:
      "A traditional herbal formulation created for seasonal and respiratory wellness support.",
    description:
      "Pneumona Powder is presented as part of BD Ayurveda's focused seasonal-wellness range. Use only according to the directions printed on the packaging or guidance from a qualified professional.",
    benefits: [
      "Designed for seasonal wellness routines",
      "Traditional herbal formulation",
      "Simple, clearly presented usage",
      "Made in India",
    ],
    ingredients: [
      { name: "Tulsi", image: "/ingredients/tulsi.webp" },
      { name: "Giloy", image: "/ingredients/giloy.webp" },
      { name: "Honey", image: "/ingredients/honey.webp" },
    ],
    directions: [
      "Read the complete label before use.",
      "Measure only the recommended quantity.",
      "Use at the advised time and frequency.",
      "Consult a qualified professional for children or specific health concerns.",
    ],
    suitableFor: [
      "Adults seeking seasonal wellness support",
      "People who prefer traditional herbal formulations",
    ],
    faqs: [
      {
        question: "Can children use this product?",
        answer:
          "Use for children only when the product label permits it and after guidance from a qualified healthcare professional.",
      },
      {
        question: "Can it replace prescribed medicine?",
        answer:
          "No. Do not stop or replace prescribed treatment without consulting your healthcare professional.",
      },
    ],
  },
  {
    name: "Age Revert Pro Capsules",
    shortName: "Age Revert Pro",
    slug: "age-revert-pro",
    category: "Healthy Ageing",
    price: 799,
    originalPrice: 899,
    badge: "Premium",
    cover: "/products/age-revert-pro/cover.webp",
    gallery: [
      "/products/age-revert-pro/cover.webp",
      "/products/age-revert-pro/gallery-1.webp",
      "/products/age-revert-pro/gallery-2.webp",
      "/products/age-revert-pro/gallery-3.webp",
      "/products/age-revert-pro/gallery-4.webp",
    ],
    shortDescription:
      "A premium Ayurvedic wellness supplement created for vitality and healthy-ageing routines.",
    description:
      "Age Revert Pro is BD Ayurveda's premium healthy-ageing formulation. It is intended to complement a balanced lifestyle and should be used only according to the product label.",
    benefits: [
      "Supports a healthy-ageing routine",
      "Premium daily-wellness positioning",
      "Convenient capsule format",
      "Clear and simple usage",
    ],
    ingredients: [
      { name: "Amla", image: "/ingredients/amla.webp" },
      { name: "Giloy", image: "/ingredients/giloy.webp" },
      { name: "Honey", image: "/ingredients/honey.webp" },
    ],
    directions: [
      "Read the complete product label.",
      "Take only the recommended serving.",
      "Use consistently at the advised time.",
      "Do not exceed the suggested daily quantity.",
    ],
    suitableFor: [
      "Adults focused on long-term wellness",
      "People looking for a convenient capsule routine",
    ],
    faqs: [
      {
        question: "Can I take this with other supplements?",
        answer:
          "Consult a qualified healthcare professional before combining supplements, especially if you take medication or have an existing health condition.",
      },
      {
        question: "How long should I use it?",
        answer:
          "Follow the duration and dosage stated on the product label or advised by a qualified professional.",
      },
    ],
  },
  {
    name: "Arshavinashak Syrup",
    shortName: "Arshavinashak",
    slug: "arshvinashak",
    category: "Digestive Wellness",
    price: 449,
    originalPrice: 499,
    badge: "Ayurvedic",
    cover: "/products/arshvinashak/cover.webp",
    gallery: [
      "/products/arshvinashak/cover.webp",
      "/products/arshvinashak/gallery-1.webp",
      "/products/arshvinashak/gallery-2.webp",
      "/products/arshvinashak/gallery-3.webp",
      "/products/arshvinashak/gallery-4.webp",
    ],
    shortDescription:
      "An Ayurvedic syrup presented for digestive comfort and everyday bowel-wellness routines.",
    description:
      "Arshavinashak Syrup is part of BD Ayurveda's digestive-wellness range. It should be used only according to the instructions printed on the packaging and is not a substitute for medical evaluation.",
    benefits: [
      "Designed for digestive-wellness routines",
      "Convenient syrup format",
      "Traditional Ayurvedic positioning",
      "Clear usage information",
    ],
    ingredients: [
      { name: "Neem", image: "/ingredients/neem.webp" },
      { name: "Giloy", image: "/ingredients/giloy.webp" },
      { name: "Amla", image: "/ingredients/amla.webp" },
    ],
    directions: [
      "Shake the bottle if directed on the label.",
      "Measure the recommended quantity carefully.",
      "Take at the advised time and frequency.",
      "Seek medical advice for persistent or severe symptoms.",
    ],
    suitableFor: [
      "Adults seeking digestive-wellness support",
      "People who prefer syrup formulations",
    ],
    faqs: [
      {
        question: "How should the syrup be taken?",
        answer:
          "Use only the amount and frequency printed on the product label. Do not exceed the recommended quantity.",
      },
      {
        question: "When should I consult a doctor?",
        answer:
          "Seek medical advice for bleeding, severe pain, persistent symptoms, pregnancy, ongoing medication or any concern requiring diagnosis.",
      },
    ],
  },
  {
    name: "Tulsipreet Cough Syrup",
    shortName: "Tulsipreet Syrup",
    slug: "cough-syrup",
    category: "Seasonal Wellness",
    price: 299,
    originalPrice: 349,
    badge: "Family Care",
    cover: "/products/cough-syrup/cover.webp",
    gallery: [
      "/products/cough-syrup/cover.webp",
      "/products/cough-syrup/gallery-1.webp",
      "/products/cough-syrup/gallery-2.webp",
      "/products/cough-syrup/gallery-3.webp",
      "/products/cough-syrup/gallery-4.webp",
    ],
    shortDescription:
      "A soothing herbal syrup for throat comfort and seasonal wellness routines.",
    description:
      "Tulsipreet Cough Syrup combines familiar herbal ingredients in an easy-to-use syrup format. Use according to the product label and seek professional advice when symptoms are persistent.",
    benefits: [
      "Soothing syrup format",
      "Designed for seasonal wellness",
      "Includes familiar herbal ingredients",
      "Easy-to-follow usage",
    ],
    ingredients: [
      { name: "Tulsi", image: "/ingredients/tulsi.webp" },
      { name: "Honey", image: "/ingredients/honey.webp" },
      { name: "Giloy", image: "/ingredients/giloy.webp" },
    ],
    directions: [
      "Shake well if instructed.",
      "Measure the recommended quantity.",
      "Use only at the frequency stated on the label.",
      "Consult a professional for children or persistent symptoms.",
    ],
    suitableFor: [
      "Adults seeking seasonal throat comfort",
      "Families who prefer herbal wellness products",
    ],
    faqs: [
      {
        question: "Is the syrup suitable for children?",
        answer:
          "Use for children only when the product label permits it and after consulting a qualified healthcare professional.",
      },
      {
        question: "What if the cough continues?",
        answer:
          "Seek medical advice if symptoms persist, worsen, are accompanied by breathing difficulty, fever or other concerning signs.",
      },
    ],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
