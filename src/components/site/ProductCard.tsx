import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to="/product/$slug" params={{ slug: product.slug }} className="group block card-hover">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button
          onClick={(e) => { e.preventDefault(); }}
          aria-label="Save"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white"
        >
          <Heart className="w-4 h-4" />
        </button>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-ink text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="pt-4 space-y-1.5">
        <h3 className="text-sm font-semibold">{product.name}</h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="w-3 h-3 fill-current text-ink" />
          <span>{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        <p className="text-sm font-bold">₹{product.price.toLocaleString()}</p>
        <div className="flex gap-1.5 pt-1">
          {product.colors.map(c => (
            <span key={c} className="w-3 h-3 rounded-full border border-border" style={{ background: c }} />
          ))}
        </div>
      </div>
    </Link>
  );
}
