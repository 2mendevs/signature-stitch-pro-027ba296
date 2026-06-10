import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { ZoomIn, ZoomOut, Type, Sparkles, Image as ImageIcon, Grid3x3, Eye, EyeOff, ChevronUp, ShoppingBag, RotateCcw, X, Bold, AlignLeft, AlignCenter, AlignRight, HelpCircle, Save, Share2, Check } from "lucide-react";
import customizeHoodie from "@/assets/customize-hoodie.jpg";
import tshirtMockup from "@/assets/tshirt-mockup.jpg";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/customize")({
  head: () => ({
    meta: [
      { title: "Customization Studio — 2MENDEVS" },
      { name: "description", content: "Design your own premium streetwear. Add text, logos, graphics & more." },
    ],
  }),
  component: CustomizePage,
});

type Layer = { id: string; type: "text" | "image"; content: string; visible: boolean; font?: string; size?: number; color?: string };

const productTypes = [
  { name: "T-Shirt", base: 799 },
  { name: "Hoodie", base: 1499 },
  { name: "Shirt", base: 1199 },
  { name: "Oversized Tee", base: 999 },
  { name: "Sweatshirt", base: 1299 },
];

const materials = [
  { name: "220 GSM", sub: "Cotton", price: 0 },
  { name: "280 GSM", sub: "Premium Cotton", price: 200 },
  { name: "320 GSM", sub: "Organic Cotton", price: 400, premium: true },
  { name: "420 GSM", sub: "Heavyweight", price: 600 },
];

const colorOptions = ["#000000","#FFFFFF","#C9C9C9","#E8D9C5","#B5A98E","#8B6F4E","#1F3A2E","#1A2B4A","#5C6B7A","#6B5670"];
const fonts = ["Bebas Neue", "Inter", "Playfair Display", "Roboto Mono", "Anton"];

function CustomizePage() {
  const navigate = useNavigate();
  const { addToCart, saveDesign } = useStore();
  const [productIdx, setProductIdx] = useState(0);
  const [materialIdx, setMaterialIdx] = useState(2);
  const [colorIdx, setColorIdx] = useState(0);
  const [view, setView] = useState<"Front" | "Back" | "Left Sleeve" | "Right Sleeve">("Front");
  const [zoom, setZoom] = useState(1);
  const [textInput, setTextInput] = useState("2MENDEVS");
  const [fontSize, setFontSize] = useState(72);
  const [fontFamily, setFontFamily] = useState("Bebas Neue");
  const [textColor, setTextColor] = useState("#E8D9C5");
  const [align, setAlign] = useState<"left"|"center"|"right">("center");
  const [layers, setLayers] = useState<Layer[]>([
    { id: "1", type: "text", content: "2MENDEVS", visible: true, font: "Bebas Neue", size: 72, color: "#E8D9C5" },
    { id: "2", type: "image", content: "Mountain", visible: true },
    { id: "3", type: "text", content: "Move in Silence", visible: true, font: "Playfair Display", size: 32, color: "#E8D9C5" },
  ]);
  const [openSection, setOpenSection] = useState<string>("text");
  const fileRef = useRef<HTMLInputElement>(null);

  const product = productTypes[productIdx];
  const material = materials[materialIdx];
  const frontPrintCost = 250;
  const total = product.base + material.price + frontPrintCost;
  const tshirtColor = colorOptions[colorIdx];
  const isDark = ["#000000","#1F3A2E","#1A2B4A","#5C6B7A","#6B5670","#8B6F4E"].includes(tshirtColor);

  const toggleLayer = (id: string) => setLayers(ls => ls.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  const moveLayer = (id: string, dir: -1 | 1) => {
    setLayers(ls => {
      const i = ls.findIndex(l => l.id === id);
      const j = i + dir;
      if (j < 0 || j >= ls.length) return ls;
      const copy = [...ls];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-extrabold tracking-tight">2MENDEVS</Link>
            <div className="hidden md:flex items-center gap-2 text-sm font-semibold">
              <span>CUSTOMIZE YOURS</span>
              <span className="text-muted-foreground">✎</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <button className="hidden md:flex items-center gap-1.5 text-muted-foreground hover:text-ink"><HelpCircle className="w-4 h-4" /> How it works</button>
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-ink"><Save className="w-4 h-4" /> Save Draft</button>
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-ink"><Share2 className="w-4 h-4" /> Share</button>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-[280px_1fr_320px] flex-1">
        <aside className="bg-background border-r border-border p-5 space-y-6 overflow-y-auto lg:max-h-[calc(100vh-64px)]">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3">1. Choose Product</p>
            <div className="space-y-2">
              {productTypes.map((p, i) => (
                <button key={p.name} onClick={() => setProductIdx(i)} className={`w-full flex items-center justify-between p-3 rounded-xl border transition ${productIdx === i ? "border-ink bg-sand" : "border-border hover:border-ink/40"}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-ink/90 flex items-center justify-center text-primary-foreground text-[9px] font-bold">{p.name.slice(0,3).toUpperCase()}</div>
                    <span className="text-sm font-semibold">{p.name}</span>
                  </div>
                  {productIdx === i && <span className="w-2 h-2 rounded-full bg-ink" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5">2. Choose Material <HelpCircle className="w-3 h-3 text-muted-foreground" /></p>
            <div className="space-y-2">
              {materials.map((m, i) => (
                <button key={m.name} onClick={() => setMaterialIdx(i)} className={`w-full flex items-center justify-between p-3 rounded-xl border transition ${materialIdx === i ? "border-ink bg-sand" : "border-border hover:border-ink/40"}`}>
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full border border-border" style={{background: i === 0 ? "#fff" : i === 1 ? "#E8D9C5" : "#000"}} />
                    <div className="text-left">
                      <p className="text-sm font-semibold">{m.name}</p>
                      <p className="text-[10px] text-muted-foreground">{m.sub}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold">{m.price === 0 ? "₹0" : `+₹${m.price}`}</p>
                    {m.premium && <span className="text-[9px] bg-ink text-primary-foreground px-1.5 py-0.5 rounded font-bold">PREMIUM</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3">3. Choose Color</p>
            <div className="grid grid-cols-5 gap-2">
              {colorOptions.map((c, i) => (
                <button key={c} onClick={() => setColorIdx(i)} className={`aspect-square rounded-full border-2 flex items-center justify-center ${colorIdx === i ? "border-ink" : "border-border"}`} style={{background: c}}>
                  {colorIdx === i && <Check className={`w-3 h-3 ${isDark ? "text-white" : "text-ink"}`} />}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">*Colors may slightly vary in real product.</p>
          </div>
        </aside>

        <main className="flex flex-col">
          <div className="bg-background border-b border-border px-6 py-3 flex items-center justify-between flex-wrap gap-3">
            <div className="flex gap-1 bg-muted/40 p-1 rounded-lg">
              {(["Front","Back","Left Sleeve","Right Sleeve"] as const).map(v => (
                <button key={v} onClick={() => setView(v)} className={`px-4 py-2 text-xs font-semibold rounded-md ${view === v ? "bg-ink text-primary-foreground" : "hover:bg-background"}`}>{v}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-xs font-semibold">Zoom</span>
              <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="w-7 h-7 rounded border border-border flex items-center justify-center"><ZoomOut className="w-3.5 h-3.5" /></button>
              <span className="text-xs w-10 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="w-7 h-7 rounded border border-border flex items-center justify-center"><ZoomIn className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-sand/40 min-h-[600px]">
            <div className="transition-transform" style={{ transform: `scale(${zoom})` }}>
              <div className="relative w-[420px] h-[520px] flex items-center justify-center">
                <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ background: tshirtColor, boxShadow: "0 30px 80px -20px rgba(0,0,0,0.3)" }}>
                  <img
                    src={product.name === "Hoodie" || product.name === "Sweatshirt" ? customizeHoodie : tshirtMockup}
                    alt=""
                    className="w-full h-full object-cover mix-blend-multiply opacity-90"
                    style={{ filter: isDark ? "brightness(0.3) contrast(1.4)" : "none" }}
                  />
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest" style={{color: isDark ? "#E8D9C5" : "#000"}}>2MENDEVS</div>
                </div>

                <div className="absolute inset-x-20 top-32 bottom-24 border-2 border-dashed border-ink/40 rounded flex flex-col items-center justify-center gap-1 p-4 text-center">
                  <button className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-white border border-border flex items-center justify-center shadow"><X className="w-3 h-3" /></button>
                  <button className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-white border border-border flex items-center justify-center shadow"><RotateCcw className="w-3 h-3" /></button>
                  <button className="absolute -bottom-3 -right-3 w-7 h-7 rounded-full bg-white border border-border flex items-center justify-center shadow text-xs">↘</button>

                  {layers.filter(l => l.visible).map(l => (
                    l.type === "text" ? (
                      <div key={l.id} style={{ color: l.color, fontFamily: l.font, fontSize: (l.size || 40) * 0.55, lineHeight: 1, fontWeight: 700, textAlign: align }}>
                        {l.content}
                      </div>
                    ) : (
                      <div key={l.id} className="text-xs opacity-60" style={{color: isDark ? "#E8D9C5" : "#000"}}>⛰ {l.content}</div>
                    )
                  ))}
                </div>

                <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center shadow"><RotateCcw className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          <div className="bg-background border-t border-border px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { i: Type, l: "Add Text" },
              { i: Sparkles, l: "Add Symbol" },
              { i: ImageIcon, l: "Upload Image" },
              { i: Grid3x3, l: "My Gallery" },
            ].map(b => (
              <button key={b.l} onClick={() => b.l === "Upload Image" && fileRef.current?.click()} className="flex items-center justify-center gap-2 border border-border rounded-xl py-3 text-sm font-semibold hover:bg-sand transition">
                <b.i className="w-4 h-4" /> {b.l}
              </button>
            ))}
            <input ref={fileRef} type="file" accept="image/*" hidden />
          </div>
        </main>

        <aside className="bg-background border-l border-border overflow-y-auto lg:max-h-[calc(100vh-64px)] flex flex-col">
          <div className="flex-1">
            <Section title="4. Add Text" open={openSection === "text"} onToggle={() => setOpenSection(openSection === "text" ? "" : "text")}>
              <input
                value={textInput}
                onChange={e => {
                  setTextInput(e.target.value);
                  setLayers(ls => ls.map(l => l.id === "1" ? { ...l, content: e.target.value } : l));
                }}
                className="w-full px-3 py-2.5 rounded-lg border border-border text-sm"
              />
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="text-[11px] font-semibold">Font Family</label>
                  <select value={fontFamily} onChange={e => { setFontFamily(e.target.value); setLayers(ls => ls.map(l => l.id === "1" ? { ...l, font: e.target.value } : l)); }} className="mt-1 w-full px-2 py-2 rounded-lg border border-border text-sm">
                    {fonts.map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold">Size</label>
                  <div className="mt-1 flex items-center border border-border rounded-lg">
                    <input value={fontSize} onChange={e => { setFontSize(+e.target.value || 0); setLayers(ls => ls.map(l => l.id === "1" ? { ...l, size: +e.target.value || 0 } : l)); }} className="flex-1 px-2 py-2 text-sm w-0 min-w-0" />
                    <button onClick={() => setFontSize(s => Math.max(8, s-2))} className="px-2 border-l border-border">−</button>
                    <button onClick={() => setFontSize(s => s+2)} className="px-2 border-l border-border">+</button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="text-[11px] font-semibold">Color</label>
                  <div className="mt-1 flex items-center gap-2 border border-border rounded-lg p-1.5">
                    <span className="w-5 h-5 rounded" style={{background: textColor}} />
                    <input value={textColor} onChange={e => { setTextColor(e.target.value); setLayers(ls => ls.map(l => l.id === "1" ? { ...l, color: e.target.value } : l)); }} className="text-xs flex-1 outline-none min-w-0" />
                  </div>
                </div>
                <button className="mt-5 px-3 py-2 border border-border rounded-lg text-sm font-bold flex items-center justify-center"><Bold className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-1 border border-border rounded-lg p-1">
                  {[AlignLeft, AlignCenter, AlignRight].map((I, i) => {
                    const v = (["left","center","right"] as const)[i];
                    return <button key={v} onClick={() => setAlign(v)} className={`p-1.5 rounded ${align === v ? "bg-ink text-primary-foreground" : ""}`}><I className="w-3.5 h-3.5" /></button>;
                  })}
                </div>
                <label className="flex items-center gap-2 text-xs font-semibold">
                  Curve Text
                  <span className="w-9 h-5 bg-muted rounded-full relative cursor-pointer block"><span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow" /></span>
                </label>
              </div>
            </Section>

            <Section title="5. Add Symbols" open={openSection === "sym"} onToggle={() => setOpenSection(openSection === "sym" ? "" : "sym")}>
              <div className="grid grid-cols-5 gap-2">
                {["★","♛","⚡","☯","✦","⛰","☁","♥","✈","♪"].map(s => (
                  <button key={s} className="aspect-square border border-border rounded-lg text-xl hover:bg-sand">{s}</button>
                ))}
              </div>
            </Section>

            <Section title="6. Upload Image" open={openSection === "up"} onToggle={() => setOpenSection(openSection === "up" ? "" : "up")}>
              <button onClick={() => fileRef.current?.click()} className="w-full border border-dashed border-border rounded-xl py-8 text-center">
                <ImageIcon className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs font-semibold">Drag &amp; drop or click to upload</p>
                <p className="text-[10px] text-muted-foreground mt-1">PNG, JPG, SVG (Max 5MB)</p>
              </button>
            </Section>

            <Section title="7. Layer Management" open={openSection === "lay"} onToggle={() => setOpenSection(openSection === "lay" ? "" : "lay")}>
              <div className="space-y-1.5">
                {layers.map(l => (
                  <div key={l.id} className="flex items-center gap-2 p-2 border border-border rounded-lg">
                    <div className="flex flex-col">
                      <button onClick={() => moveLayer(l.id, -1)} className="text-muted-foreground hover:text-ink text-xs">▲</button>
                      <button onClick={() => moveLayer(l.id, 1)} className="text-muted-foreground hover:text-ink text-xs">▼</button>
                    </div>
                    <span className="w-6 h-6 rounded bg-sand flex items-center justify-center text-xs font-bold">
                      {l.type === "text" ? "T" : <ImageIcon className="w-3 h-3" />}
                    </span>
                    <span className="text-xs font-semibold flex-1 truncate">{l.content}</span>
                    <button onClick={() => toggleLayer(l.id)}>
                      {l.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />}
                    </button>
                    <span className="text-muted-foreground cursor-grab text-xs">⋮⋮</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="8. Price Details" open={openSection === "price"} onToggle={() => setOpenSection(openSection === "price" ? "" : "price")}>
              <div className="space-y-2 text-sm">
                <Row k={`Base Price (${product.name})`} v={`₹${product.base}`} />
                <Row k={`Material (${material.name})`} v={material.price === 0 ? "₹0" : `+₹${material.price}`} />
                <Row k="Premium Print (Front)" v={`+₹${frontPrintCost}`} />
                <div className="border-t border-border pt-2 flex justify-between font-extrabold text-base">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </Section>
          </div>

          <div className="p-4 sticky bottom-0 bg-background border-t border-border space-y-2">
            <button
              onClick={() => {
                const design = { productType: product.name, material: material.name, materialPrice: material.price, color: tshirtColor, text: textInput, font: fontFamily, textColor, placement: view, extras: [{ label: "Front Print", price: frontPrintCost }] };
                addToCart({ slug: `custom-${Date.now()}`, name: `Custom ${product.name}`, image: product.name === "Hoodie" || product.name === "Sweatshirt" ? customizeHoodie : tshirtMockup, price: total, size: "M", color: tshirtColor, qty: 1, custom: design });
                toast.success("Custom design added to cart");
                navigate({ to: "/cart" });
              }}
              className="w-full bg-ink text-primary-foreground py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90"
            >
              <ShoppingBag className="w-4 h-4" /> ADD TO CART · ₹{total.toLocaleString()}
            </button>
            <button
              onClick={() => {
                saveDesign({ name: `${product.name} · ${textInput || "Untitled"}`, productType: product.name, material: material.name, materialPrice: material.price, color: tshirtColor, text: textInput, font: fontFamily, textColor, placement: view, extras: [{ label: "Front Print", price: frontPrintCost }], price: total });
                toast.success("Design saved");
              }}
              className="w-full border border-border py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-2"
            >
              <Save className="w-3.5 h-3.5" /> Save Design
            </button>
          </div>
        </aside>
      </div>

      <footer className="bg-background border-t border-border">
        <div className="container-x py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            ["Premium Quality", "Finest fabrics & printing"],
            ["Safe Payments", "100% secure checkout"],
            ["Easy Returns", "7-day return policy"],
            ["Made in India", "Proudly crafted"],
          ].map(([t, s]) => (
            <div key={t} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-sand flex items-center justify-center"><Check className="w-4 h-4" /></div>
              <div>
                <p className="text-xs font-bold">{t}</p>
                <p className="text-[11px] text-muted-foreground">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

function Section({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-b border-border">
      <button onClick={onToggle} className="w-full flex items-center justify-between px-5 py-4">
        <span className="text-xs font-bold uppercase tracking-widest">{title}</span>
        <ChevronUp className={`w-4 h-4 transition ${open ? "" : "rotate-180"}`} />
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{k}</span>
      <span className="text-ink font-semibold">{v}</span>
    </div>
  );
}
