import hoodieBlack from "@/assets/product-hoodie-black.jpg";
import teeCream from "@/assets/product-tee-cream.jpg";
import teeBlack from "@/assets/product-tee-black.jpg";
import joggers from "@/assets/product-joggers.jpg";
import cap from "@/assets/product-cap.jpg";
import tshirtMockup from "@/assets/tshirt-mockup.jpg";
import customizeHoodie from "@/assets/customize-hoodie.jpg";
import fabric from "@/assets/fabric-closeup.jpg";

export type Category = "Hoodies" | "T-Shirts" | "Oversized Tees" | "Joggers" | "Accessories";

export type Product = {
  slug: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  colors: string[];
  sizes: string[];
  material: string;
  fabric: string;
  description: string;
  specs: { label: string; value: string }[];
  stock: number;
  tags: string[];
  badge?: string;
  category: Category;
  isNew?: boolean;
  isBestSeller?: boolean;
};

const HOODIE_GALLERY = [hoodieBlack, customizeHoodie, fabric, hoodieBlack];
const TEE_GALLERY = [teeBlack, tshirtMockup, fabric, teeCream];
const TEE_CREAM_GALLERY = [teeCream, tshirtMockup, fabric, teeBlack];
const JOGGER_GALLERY = [joggers, joggers, fabric, joggers];
const ACC_GALLERY = [cap, cap, fabric, cap];

const sizesApparel = ["XS", "S", "M", "L", "XL", "XXL"];
const sizesAcc = ["One Size"];

const palette = {
  earth: ["#000000", "#E8D9C5", "#8B6F4E", "#C9C0B3"],
  mono: ["#000000", "#FFFFFF", "#525252"],
  premium: ["#000000", "#E8D9C5", "#1F3A2E", "#1A2B4A"],
  warm: ["#E8D9C5", "#B5A98E", "#8B6F4E"],
};

let id = 0;
const make = (
  name: string,
  category: Category,
  price: number,
  image: string,
  gallery: string[],
  colors: string[],
  sizes: string[],
  opts: Partial<Product> = {},
): Product => {
  id++;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + (opts.badge ? "" : "");
  return {
    slug: `${slug}-${id}`,
    name,
    price,
    rating: 4.4 + Math.random() * 0.6,
    reviews: 40 + Math.floor(Math.random() * 280),
    image,
    gallery,
    colors,
    sizes,
    material: opts.material ?? "280 GSM Premium Cotton",
    fabric: opts.fabric ?? "100% Combed Cotton, Pre-Shrunk, Bio-Washed",
    description:
      opts.description ??
      `${name} — crafted from premium fabric with a relaxed, modern silhouette. Designed in India for everyday wear.`,
    specs: opts.specs ?? [
      { label: "Fit", value: "Oversized / Relaxed" },
      { label: "Material", value: "Premium Cotton" },
      { label: "Wash Care", value: "Machine wash cold" },
      { label: "Origin", value: "Made in India" },
    ],
    stock: 12 + Math.floor(Math.random() * 80),
    tags: opts.tags ?? [category],
    badge: opts.badge,
    category,
    isNew: opts.isNew,
    isBestSeller: opts.isBestSeller,
  };
};

const hoodies: Product[] = [
  ["Signature Oversized Hoodie", 1999, { badge: "Bestseller", isBestSeller: true }],
  ["Essential Hoodie", 1699, {}],
  ["Heavyweight Hoodie", 2199, { material: "420 GSM Heavyweight Cotton" }],
  ["Vintage Wash Hoodie", 1899, { badge: "New", isNew: true }],
  ["Minimal Logo Hoodie", 1799, {}],
  ["Utility Hoodie", 2099, {}],
  ["Graphic Hoodie", 1999, {}],
  ["Embroidered Hoodie", 2299, {}],
  ["Streetwear Hoodie", 1899, {}],
  ["Back Print Hoodie", 2099, { badge: "Bestseller", isBestSeller: true }],
  ["Acid Wash Hoodie", 1999, {}],
  ["Drop Shoulder Hoodie", 1899, { isNew: true }],
  ["Premium Cotton Hoodie", 2399, { badge: "Premium" }],
  ["Limited Edition Hoodie", 2599, { badge: "Limited" }],
  ["Artist Series Hoodie", 2499, { badge: "New", isNew: true }],
].map(([n, p, o]) => make(n as string, "Hoodies", p as number, hoodieBlack, HOODIE_GALLERY, palette.earth, sizesApparel, o as any));

const tees: Product[] = [
  ["Essential Tee", 699],
  ["Premium Cotton Tee", 899, { badge: "Bestseller", isBestSeller: true }],
  ["Heavyweight Tee", 999],
  ["Minimal Logo Tee", 799],
  ["Relaxed Fit Tee", 849],
  ["Vintage Tee", 899, { isNew: true }],
  ["Graphic Tee", 949],
  ["Embroidered Tee", 1099],
  ["Everyday Tee", 749],
  ["Box Fit Tee", 899],
  ["Summer Tee", 799, { isNew: true }],
  ["Streetwear Tee", 899],
  ["Drop Shoulder Tee", 949],
  ["Signature Tee", 999, { badge: "Bestseller", isBestSeller: true }],
  ["Washed Tee", 849],
].map(([n, p, o], i) =>
  make(n as string, "T-Shirts", p as number, i % 2 ? teeBlack : teeCream, i % 2 ? TEE_GALLERY : TEE_CREAM_GALLERY, palette.mono, sizesApparel, o as any),
);

const oversized: Product[] = [
  ["Signature Oversized Tee", 999, { badge: "Bestseller", isBestSeller: true }],
  ["Graphic Oversized Tee", 1099],
  ["Vintage Oversized Tee", 1149, { isNew: true }],
  ["Streetwear Oversized Tee", 1099],
  ["Heavyweight Oversized Tee", 1299, { material: "320 GSM" }],
  ["Back Print Oversized Tee", 1199],
  ["Minimal Oversized Tee", 999],
  ["Acid Wash Oversized Tee", 1199],
  ["Artist Collection Tee", 1399, { badge: "Limited" }],
  ["Urban Oversized Tee", 1099],
  ["Premium Oversized Tee", 1299, { badge: "Premium" }],
  ["Drop Shoulder Oversized Tee", 1149],
  ["Washed Oversized Tee", 1049],
  ["Summer Oversized Tee", 999, { isNew: true }],
  ["Embroidered Oversized Tee", 1399],
].map(([n, p, o], i) =>
  make(n as string, "Oversized Tees", p as number, i % 2 ? teeCream : teeBlack, i % 2 ? TEE_CREAM_GALLERY : TEE_GALLERY, palette.earth, sizesApparel, o as any),
);

const joggersArr: Product[] = [
  ["Essential Joggers", 1499, { badge: "Bestseller", isBestSeller: true }],
  ["Premium Joggers", 1799],
  ["Cargo Joggers", 1899, { isNew: true }],
  ["Utility Joggers", 1799],
  ["Relaxed Joggers", 1599],
  ["Athletic Joggers", 1699],
  ["Tapered Joggers", 1649],
  ["Streetwear Joggers", 1799],
  ["Minimal Joggers", 1499],
  ["Heavyweight Joggers", 1899],
  ["Everyday Joggers", 1399],
  ["Washed Joggers", 1599, { isNew: true }],
  ["Performance Joggers", 1899],
  ["Travel Joggers", 1799],
  ["Signature Joggers", 1999, { badge: "Premium" }],
].map(([n, p, o]) => make(n as string, "Joggers", p as number, joggers, JOGGER_GALLERY, palette.mono, sizesApparel, o as any));

const acc: Product[] = [
  ["Classic Cap", 599, { badge: "Bestseller", isBestSeller: true }],
  ["Premium Cap", 799],
  ["Beanie", 649, { isNew: true }],
  ["Crossbody Bag", 1299],
  ["Tote Bag", 899],
  ["Gym Bag", 1499],
  ["Water Bottle", 499],
  ["Socks", 299],
  ["Sticker Pack", 199],
  ["Keychain", 249],
  ["Laptop Sleeve", 999],
  ["Phone Case", 599],
  ["Travel Pouch", 799, { isNew: true }],
  ["Wrist Band", 199],
  ["Premium Backpack", 1999, { badge: "Premium" }],
].map(([n, p, o]) => make(n as string, "Accessories", p as number, cap, ACC_GALLERY, palette.earth, sizesAcc, o as any));

export const products: Product[] = [...hoodies, ...tees, ...oversized, ...joggersArr, ...acc];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug) ?? products[0];

export const categories: Category[] = ["Hoodies", "T-Shirts", "Oversized Tees", "Joggers", "Accessories"];

export const allColors = Array.from(new Set(products.flatMap((p) => p.colors)));
export const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
export const allMaterials = Array.from(new Set(products.map((p) => p.material)));
