import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Menu, Heart } from "lucide-react";
import { useState } from "react";
import { useStore, cartCount } from "@/lib/store";

const navLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/customize", label: "Customize" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/account", label: "Account" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-primary-foreground text-xs">
      <div className="container-x flex items-center justify-center gap-6 py-2.5 overflow-x-auto whitespace-nowrap">
        <span>◇ Free shipping on orders above ₹999</span>
        <span className="hidden sm:inline">◇ Easy 7-Day Returns</span>
        <span className="hidden md:inline">◇ Customize Your Style, Make It Yours</span>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { cart, wishlist } = useStore();
  const count = cartCount(cart);
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <AnnouncementBar />
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="text-xl md:text-2xl font-extrabold tracking-tight">2MENDEVS</Link>
        <nav className="hidden lg:flex items-center gap-9 text-sm font-semibold tracking-wide">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to as any} className="hover:text-muted-foreground transition-colors uppercase text-[12px]">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/shop" aria-label="Search" className="hidden sm:block hover:opacity-70"><Search className="w-5 h-5" /></Link>
          <Link to="/wishlist" aria-label="Wishlist" className="relative hover:opacity-70">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-ink text-primary-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{wishlist.length}</span>
            )}
          </Link>
          <Link to="/account" aria-label="Account" className="hidden sm:block hover:opacity-70"><User className="w-5 h-5" /></Link>
          <Link to="/cart" aria-label="Cart" className="relative hover:opacity-70">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-ink text-primary-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{count}</span>
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu"><Menu className="w-5 h-5" /></button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-x flex flex-col py-4 gap-3 text-sm font-semibold uppercase">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to as any} onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
