import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Minus, Plus, ShoppingBag, Edit3, Truck, Ruler, ChevronDown, Check, Upload, Type, Palette, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { getProduct, products } from "@/lib/products";
import hoodieBlack from "@/assets/product-hoodie-black.jpg";
import teeBlack from "@/assets/product-tee-black.jpg";
import joggersImg from "@/assets/product-joggers.jpg";
import brandStory from "@/assets/brand-story.jpg";
import fabricImg from "@/assets/fabric-closeup.jpg";
import customizeHoodie from "@/assets/customize-hoodie.jpg";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — 2MENDEVS` },
      { name: "description", content: "Premium oversized hoodie crafted from 420 GSM French Terry Cotton. Made in India." },
    ],
  }),
  component: ProductPage,
});

const gallery = [hoodieBlack, hoodieBlack, hoodieBlack, fabricImg, hoodieBlack, joggersImg];
const lifestyle = [
  { tag: "Streetwear", img: hoodieBlack },
  { tag: "Travel", img: joggersImg },
  { tag: "College", img: teeBlack },
  { tag: "Daily Wear", img: hoodieBlack },
];
const features = [
  { t: "420 GSM", s: "Heavyweight" },
  { t: "Premium", s: "Embroidery" },
  { t: "Oversized", s: "Fit" },
  { t: "Pre-Shrunk", s: "Fabric" },
  { t: "Made in", s: "India" },
];
const timeline = ["Premium Cotton", "Cut & Sew Precision", "Embroidery Perfection", "Quality Check", "Delivered To You"];
const faqs = [
  { q: "Will this hoodie shrink after washing?", a: "No, our fabric is pre-shrunk and bio-washed to retain shape." },
  { q: "How long will it take to deliver my order?", a: "Standard orders ship within 24 hours and arrive in 3-5 business days." },
  { q: "Can I customize this hoodie?", a: "Yes — head to our Customization Studio to add text, logos and graphics." },
  { q: "Can I return or exchange if I customize?", a: "Customized items are final sale but we replace any manufacturing defect." },
];

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  const [active, setActive] = useState(0);
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container-x py-4 text-xs text-muted-foreground">
        <Link to="/">Home</Link> / <Link to="/shop">Men</Link> / <Link to="/shop">Hoodies</Link> / <span className="text-ink">{product.name}</span>
      </div>

      <section className="container-x grid lg:grid-cols-[80px_1fr_460px] gap-6 pb-16">
        <div className="hidden lg:flex flex-col gap-3">
          {gallery.map((g, i) => (
            <button key={i} onClick={() => setActive(i)} className={`aspect-square rounded-xl overflow-hidden border-2 ${active === i ? "border-ink" : "border-transparent"} bg-sand`}>
              <img src={g} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
        <div>
          <div className="aspect-[4/5] bg-sand rounded-2xl overflow-hidden">
            <img src={gallery[active]} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="space-y-5">
          <span className="inline-block bg-sand text-ink text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Bestseller</span>
          <h1 className="text-3xl lg:text-4xl font-extrabold">{product.name}</h1>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current text-ink" />)}</div>
            <span className="font-semibold">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviews} reviews)</span>
          </div>
          <div>
            <p className="text-3xl font-extrabold">₹{product.price.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>
          </div>

          <div>
            <p className="text-xs mb-2"><span className="font-semibold">Color:</span> <span className="text-muted-foreground">Black</span></p>
            <div className="flex gap-2">
              {product.colors.map(c => (
                <button key={c} onClick={() => setColor(c)} className={`w-10 h-10 rounded-full border-2 ${color === c ? "border-ink" : "border-border"} flex items-center justify-center`}>
                  <span className="w-7 h-7 rounded-full" style={{ background: c }} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs"><span className="font-semibold">Size:</span></p>
              <button className="text-xs flex items-center gap-1 underline"><Ruler className="w-3 h-3" /> Size Guide</button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {["XS","S","M","L","XL","XXL"].map(s => (
                <button key={s} onClick={() => setSize(s)} className={`py-3 rounded-lg border text-sm font-semibold ${size === s ? "bg-ink text-primary-foreground border-ink" : "bg-background border-border hover:border-ink"}`}>{s}</button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold mb-2">Quantity:</p>
            <div className="inline-flex items-center border border-border rounded-lg">
              <button onClick={() => setQty(Math.max(1, qty-1))} className="px-3 py-2.5"><Minus className="w-3.5 h-3.5" /></button>
              <span className="px-4 text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty(qty+1)} className="px-3 py-2.5"><Plus className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          <button className="w-full bg-ink text-primary-foreground py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition">
            <ShoppingBag className="w-4 h-4" /> ADD TO CART · ₹{(product.price * qty).toLocaleString()}
          </button>
          <Link to="/customize" className="w-full border border-border py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-ink hover:text-primary-foreground transition">
            <Edit3 className="w-4 h-4" /> CUSTOMIZE THIS HOODIE
          </Link>

          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
            <Truck className="w-4 h-4" /> Order within <span className="font-bold text-ink">2 hrs 15 mins</span>, get it by <span className="font-bold text-ink">May 29</span>
          </div>
        </div>
      </section>

      <section className="container-x">
        <div className="bg-sand rounded-2xl p-8 grid md:grid-cols-[1fr_2.5fr] gap-8 items-center">
          <div>
            <h3 className="text-xl font-extrabold uppercase">Not Your Average Hoodie.</h3>
            <p className="text-sm text-muted-foreground mt-3">Every detail is crafted to bring unmatched comfort, quality and style.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {features.map(f => (
              <div key={f.t} className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full border border-border bg-white flex items-center justify-center mb-2">
                  <Check className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold">{f.t}</p>
                <p className="text-[11px] text-muted-foreground">{f.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x mt-6">
        <div className="bg-sand rounded-2xl p-8 grid md:grid-cols-[1fr_3fr] gap-6 items-center">
          <div>
            <h3 className="text-xl font-extrabold uppercase">Built for<br />every moment.</h3>
            <p className="text-sm text-muted-foreground mt-3">From city streets to chill days, this hoodie fits your vibe.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {lifestyle.map(l => (
              <div key={l.tag} className="relative aspect-[3/4] rounded-xl overflow-hidden">
                <img src={l.img} alt={l.tag} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-xs font-bold">{l.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x mt-6">
        <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden bg-sand">
          <div className="aspect-square md:aspect-auto">
            <img src={fabricImg} alt="Fabric close-up" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="p-10 self-center space-y-4">
            <h3 className="text-2xl font-extrabold uppercase">Fabric That<br />Feels Different.</h3>
            <p className="text-sm text-muted-foreground">Crafted from premium 420 GSM French Terry Cotton that&apos;s soft on the inside, tough on the outside.</p>
            <ul className="space-y-2 text-sm">
              {["100% French Terry Cotton","Breathable & Comfortable","Pre-Shrunk & Bio-Washed","Durable & Long Lasting"].map(i => (
                <li key={i} className="flex items-center gap-2"><Check className="w-4 h-4" /> {i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-x mt-6">
        <div className="bg-sand rounded-2xl p-8 grid lg:grid-cols-[1fr_1fr_1fr] gap-8 items-center">
          <div>
            <h3 className="text-2xl font-extrabold uppercase">Make It Yours.</h3>
            <p className="text-sm text-muted-foreground mt-3">Add your text, logo or artwork and create something that&apos;s 100% you.</p>
            <div className="grid grid-cols-5 gap-3 mt-5">
              {[Type, ImageIcon, Upload, Palette, Edit3].map((I, i) => (
                <div key={i} className="text-center">
                  <div className="w-9 h-9 mx-auto rounded-full bg-white border border-border flex items-center justify-center mb-1"><I className="w-4 h-4" /></div>
                  <p className="text-[10px] font-semibold">{["Add Text","Add Logo","Upload","Colors","Placement"][i]}</p>
                </div>
              ))}
            </div>
            <Link to="/customize" className="btn-primary mt-5">Start Customizing <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <img src={customizeHoodie} alt="" className="max-h-80 object-contain" />
              <div className="absolute inset-x-12 inset-y-16 border-2 border-dashed border-ink/40 rounded flex items-center justify-center text-xs text-ink/60 font-semibold text-center">
                YOUR<br />DESIGN<br />HERE
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-1 bg-white p-1 rounded-lg">
              {["Front","Back","Left","Right"].map((v,i) => (
                <button key={v} className={`text-xs py-2 rounded font-semibold ${i===1 ? "bg-ink text-primary-foreground" : ""}`}>{v}</button>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold mb-1.5">Add Text</p>
              <input className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm" placeholder="Your Text Here" />
            </div>
            <div>
              <p className="text-xs font-semibold mb-1.5">Upload Logo / Artwork</p>
              <div className="border border-dashed border-border rounded-lg p-4 text-center bg-white">
                <Upload className="w-4 h-4 mx-auto mb-1" />
                <p className="text-xs font-semibold">Upload File</p>
                <p className="text-[10px] text-muted-foreground">PNG, JPG or SVG</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold mb-1.5">Choose Color</p>
              <div className="flex gap-2">
                {["#000","#E8D9C5","#8B6F4E","#525252","#C9C0B3"].map(c => <span key={c} className="w-6 h-6 rounded-full border border-border" style={{background:c}} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x mt-6 grid md:grid-cols-2 gap-6">
        <div className="bg-sand rounded-2xl p-8">
          <h3 className="font-bold uppercase mb-1">Find Your Perfect Fit.</h3>
          <p className="text-xs text-muted-foreground mb-5">Get size recommendation based on your body stats.</p>
          <div className="grid grid-cols-3 gap-3 items-end">
            <div>
              <label className="text-xs font-semibold">Height</label>
              <select className="mt-1 w-full bg-white border border-border rounded-lg px-3 py-2.5 text-sm">
                <option>5&apos;8&quot; (172 cm)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold">Weight</label>
              <select className="mt-1 w-full bg-white border border-border rounded-lg px-3 py-2.5 text-sm">
                <option>72 kg</option>
              </select>
            </div>
            <div className="bg-white border border-border rounded-lg p-3 text-center">
              <p className="text-[10px] text-muted-foreground">Recommended</p>
              <p className="text-2xl font-extrabold">M</p>
              <p className="text-[10px] text-green-600 font-semibold">Fits you best</p>
            </div>
          </div>
        </div>
        <div className="bg-sand rounded-2xl p-8">
          <h3 className="font-bold uppercase mb-1">How It&apos;s Made.</h3>
          <p className="text-xs text-muted-foreground mb-5">Thoughtful process. Premium quality.</p>
          <div className="flex items-center justify-between gap-2">
            {timeline.map((t,i) => (
              <div key={t} className="flex-1 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-white border border-border flex items-center justify-center mb-1.5 text-xs font-bold">{i+1}</div>
                <p className="text-[10px] font-semibold leading-tight">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x mt-12 grid md:grid-cols-[260px_1fr] gap-8">
        <div>
          <p className="text-xs uppercase tracking-widest font-bold mb-2">What our community says</p>
          <p className="text-5xl font-extrabold">4.8</p>
          <p className="text-yellow-500">★★★★★</p>
          <p className="text-xs text-muted-foreground mt-1">Based on {product.reviews} reviews</p>
          <button className="btn-outline mt-4 text-xs">Write a Review</button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { n: "Arjun M.", t: "The quality is insane! The fabric feels premium and fits perfectly. My new go-to hoodie." },
            { n: "Rohit D.", t: "Best oversized hoodie I've owned. Super comfortable and the fit is on point." },
            { n: "Karan S.", t: "Love the minimal branding and the thick fabric. Worth every penny!" },
          ].map(r => (
            <div key={r.n} className="bg-sand rounded-xl p-5">
              <div className="flex justify-between text-xs font-semibold mb-2"><span>{r.n}</span><span className="text-muted-foreground">May 18, 2026</span></div>
              <div className="text-yellow-500 text-xs mb-2">★★★★★</div>
              <p className="text-sm text-ink-soft leading-relaxed">{r.t}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x mt-16">
        <h3 className="text-xs uppercase tracking-widest font-bold mb-4">Frequently Asked Questions</h3>
        <div className="grid md:grid-cols-[1fr_1fr] gap-6">
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left py-4 flex justify-between items-center gap-4">
                  <span className="text-sm font-semibold">{f.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <p className="pb-4 text-sm text-muted-foreground">{f.a}</p>}
              </div>
            ))}
          </div>
          <div className="bg-ink text-primary-foreground rounded-2xl p-6 relative overflow-hidden">
            <img src={brandStory} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-30" />
            <div className="relative z-10 h-full flex flex-col justify-between gap-6 min-h-[180px]">
              <div>
                <p className="text-xs uppercase tracking-widest font-bold mb-1">Still thinking?</p>
                <p className="text-sm">This hoodie is one of our bestsellers for a reason.</p>
              </div>
              <button className="bg-white text-ink py-3 rounded-full font-bold text-sm">ADD TO CART · ₹{product.price.toLocaleString()}</button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x mt-16">
        <h3 className="headline-lg mb-8">You May Also Like.</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.filter(p => p.slug !== product.slug).slice(0,4).map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      <Footer />
    </div>
  );
}
