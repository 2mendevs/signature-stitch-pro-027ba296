import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, inWishlist } = useStore();
  const liked = inWishlist(product.slug);
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
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.slug);
            toast(liked ? "Removed from wishlist" : "Added to wishlist");
          }}
          aria-label="Save"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition"
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-ink text-ink" : ""}`} />
        </button>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-ink text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="pt-4 space-y-1.5">
        <h3 className="text-sm font-semibold line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="w-3 h-3 fill-current text-ink" />
          <span>{product.rating.toFixed(1)}</span>
          <span>({product.reviews})</span>
        </div>
        <p className="text-sm font-bold">₹{product.price.toLocaleString()}</p>
        <div className="flex gap-1.5 pt-1">
          {product.colors.slice(0, 4).map((c) => (
            <span key={c} className="w-3 h-3 rounded-full border border-border" style={{ background: c }} />
          ))}
        </div>
      </div>
    </Link>
  );
}
