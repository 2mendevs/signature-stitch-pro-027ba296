import hoodieBlack from "@/assets/product-hoodie-black.jpg";
import teeCream from "@/assets/product-tee-cream.jpg";
import teeBlack from "@/assets/product-tee-black.jpg";
import joggers from "@/assets/product-joggers.jpg";
import cap from "@/assets/product-cap.jpg";

export type Product = {
  slug: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  colors: string[];
  badge?: string;
  category: string;
};

export const products: Product[] = [
  { slug: "signature-oversized-hoodie", name: "Signature Oversized Hoodie", price: 1999, rating: 4.8, reviews: 247, image: hoodieBlack, colors: ["#000000", "#E8D9C5", "#8B6F4E", "#C9C0B3"], badge: "Bestseller", category: "Hoodies" },
  { slug: "2mnd-oversized-tee", name: "2MND Oversized Tee", price: 899, rating: 4.7, reviews: 178, image: teeCream, colors: ["#E8D9C5", "#000000", "#FFFFFF"], category: "T-Shirts" },
  { slug: "essential-joggers", name: "Essential Joggers", price: 1499, rating: 4.6, reviews: 96, image: joggers, colors: ["#000000", "#3B3B3B", "#E8D9C5"], category: "Joggers" },
  { slug: "washed-cap", name: "Washed Cap", price: 599, rating: 4.5, reviews: 264, image: cap, colors: ["#000000", "#E8D9C5", "#5A4A3B"], category: "Accessories" },
  { slug: "utility-overshirt", name: "Utility Overshirt", price: 1899, rating: 4.7, reviews: 132, image: teeBlack, colors: ["#000000", "#525252", "#E8D9C5"], category: "T-Shirts" },
  { slug: "graphic-back-hoodie", name: "Graphic Back Hoodie", price: 2099, rating: 4.9, reviews: 211, image: hoodieBlack, colors: ["#000000", "#E8D9C5"], category: "Hoodies" },
  { slug: "raw-edge-tee", name: "Raw Edge Tee", price: 999, rating: 4.6, reviews: 88, image: teeBlack, colors: ["#000000", "#E8D9C5"], category: "T-Shirts" },
  { slug: "paint-splatter-tee", name: "Paint Splatter Tee", price: 1099, rating: 4.5, reviews: 64, image: teeCream, colors: ["#E8D9C5", "#FFFFFF"], category: "T-Shirts" },
];

export const getProduct = (slug: string) => products.find(p => p.slug === slug) ?? products[0];
