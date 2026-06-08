import { Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-primary-foreground mt-24">
      <div className="container-x py-16 grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-extrabold mb-4">2MENDEVS</h3>
          <p className="text-sm text-white/60 max-w-xs leading-relaxed">
            Elevated essentials for the modern man. Designed to move with you, made to make a statement.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" aria-label="Instagram" className="hover:opacity-70"><Instagram className="w-5 h-5" /></a>
            <a href="#" aria-label="Twitter" className="hover:opacity-70"><Twitter className="w-5 h-5" /></a>
            <a href="#" aria-label="YouTube" className="hover:opacity-70"><Youtube className="w-5 h-5" /></a>
          </div>
        </div>
        {[
          { title: "Shop", links: ["All Products", "Hoodies", "T-Shirts", "Joggers", "Accessories"] },
          { title: "Customer Care", links: ["FAQ", "Shipping & Delivery", "Returns & Exchanges", "Size Guide", "Contact Us"] },
          { title: "About", links: ["Our Story", "Sustainability", "Careers", "Press"] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-4 text-white/80">{col.title}</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              {col.links.map(l => <li key={l}><a href="#" className="hover:text-white transition">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/50">
          <span>© 2026 2MENDEVS. All rights reserved.</span>
          <div className="flex gap-4">
            <span>VISA</span><span>Mastercard</span><span>PayPal</span><span>G Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
