"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const BASE = "https://images.unsplash.com"

type Category = "Nature" | "Abstract" | "Objects" | "Architecture"

interface UnsplashPhoto {
  id: string
  alt: string
  category: Category
}

const PHOTOS: UnsplashPhoto[] = [
  // Nature
  { id: "photo-1506905925346-21bda4d32df4", alt: "Snowy mountain peaks",     category: "Nature" },
  { id: "photo-1441974231531-c6227db76b6e", alt: "Sunlit forest path",       category: "Nature" },
  { id: "photo-1472214103451-9374bd1c798e", alt: "Golden sunset landscape",  category: "Nature" },
  { id: "photo-1518173946687-a4c8892bbd9f", alt: "Autumn leaves",            category: "Nature" },
  { id: "photo-1505765050516-f72dc64a3a46", alt: "Ocean waves at sunset",    category: "Nature" },
  { id: "photo-1469474968028-56623f02e42e", alt: "Mountain valley mist",     category: "Nature" },
  { id: "photo-1501854140801-50d01698950b", alt: "Aerial green hills",       category: "Nature" },
  { id: "photo-1465146344425-f00d5f5c8f07", alt: "Colorful wildflowers",     category: "Nature" },
  { id: "photo-1464822759023-fed622ff2c3b", alt: "Rocky mountain peaks",     category: "Nature" },
  { id: "photo-1520962922320-2b03234e38dd", alt: "Tropical waterfall",       category: "Nature" },
  { id: "photo-1547036967-23d11aacaee0",    alt: "Desert sand dunes",        category: "Nature" },
  { id: "photo-1532274402911-5a369e4c4bb5", alt: "Calm lake reflection",     category: "Nature" },
  { id: "photo-1519681393784-d120267933ba", alt: "Starry night sky",         category: "Nature" },
  { id: "photo-1536431311719-398b6704d4cc", alt: "Tropical beach",           category: "Nature" },
  { id: "photo-1540979388789-6cee28a1cdc9", alt: "Northern lights",          category: "Nature" },
  { id: "photo-1522748906645-95d8adfd52c7", alt: "Cherry blossom trees",     category: "Nature" },
  // Abstract
  { id: "photo-1579546929518-9e396f3cc809", alt: "Colorful gradient",        category: "Abstract" },
  { id: "photo-1558618666-fcd25c85cd64", alt: "Purple abstract fluid",       category: "Abstract" },
  { id: "photo-1541701494587-cb58502866ab", alt: "Blue abstract waves",      category: "Abstract" },
  { id: "photo-1550684848-fac1c5b4e853", alt: "Pastel color swirls",         category: "Abstract" },
  { id: "photo-1618005182384-a83a8bd57fbe", alt: "Neon bokeh lights",        category: "Abstract" },
  { id: "photo-1557682224-5b8590cd9ec5", alt: "Soft pink gradient",          category: "Abstract" },
  { id: "photo-1501366062246-723b4d3e4eb5", alt: "Dark abstract texture",    category: "Abstract" },
  { id: "photo-1567359781514-3b964e2b04d6", alt: "Geometric colorful shapes",category: "Abstract" },
  // Objects
  { id: "photo-1495474472287-4d71bcdd2085", alt: "Minimal coffee cup",       category: "Objects" },
  { id: "photo-1523275335684-37898b6baf30", alt: "Classic wristwatch",       category: "Objects" },
  { id: "photo-1491553895911-0055eca6402d", alt: "Bright running shoes",     category: "Objects" },
  { id: "photo-1585386959984-a4155224a1ad", alt: "Luxury perfume bottle",    category: "Objects" },
  { id: "photo-1484704849700-f032a568e944", alt: "Headphones on desk",       category: "Objects" },
  { id: "photo-1526170375885-4d8ecf77b99f", alt: "Polaroid camera",         category: "Objects" },
  { id: "photo-1542291026-7eec264c27ff", alt: "Nike sneakers red",           category: "Objects" },
  { id: "photo-1593642632559-0c6d3fc62b89", alt: "MacBook laptop",           category: "Objects" },
  // Architecture
  { id: "photo-1486325212027-8081e485255e", alt: "Modern glass building",    category: "Architecture" },
  { id: "photo-1487958449943-2429e8be8625", alt: "White modern house",       category: "Architecture" },
  { id: "photo-1464082354059-27db6ce50048", alt: "Gothic arch corridor",     category: "Architecture" },
  { id: "photo-1477959858617-67f85cf4f1df", alt: "City skyline night",       category: "Architecture" },
  { id: "photo-1502602898657-3e91760cbb34", alt: "Paris Eiffel Tower",       category: "Architecture" },
  { id: "photo-1555881400-74d7acaacd8b", alt: "Minimalist interior",         category: "Architecture" },
  { id: "photo-1507003211169-0a1dd7228f2d", alt: "Concrete staircase",       category: "Architecture" },
  { id: "photo-1519167758481-83f550bb49b3", alt: "Grand ballroom",           category: "Architecture" },
]

const CATEGORIES: Category[] = ["Nature", "Abstract", "Objects", "Architecture"]

function thumbUrl(id: string) {
  return `${BASE}/${id}?w=200&h=140&fit=crop&q=70`
}
function fullUrl(id: string) {
  return `${BASE}/${id}?w=1200&q=85`
}

interface ImagePickerProps {
  value: string | undefined
  onChange: (url: string) => void
}

export function ImagePicker({ value, onChange }: ImagePickerProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("Nature")

  const visible = PHOTOS.filter(p => p.category === activeCategory)

  return (
    <div className="space-y-2">
      {/* Category tabs */}
      <div className="flex gap-1 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors duration-150 cursor-pointer",
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-3 gap-1.5 max-h-52 overflow-y-auto pr-0.5">
        {visible.map(photo => {
          const full = fullUrl(photo.id)
          const isSelected = value === full
          return (
            <button
              key={photo.id}
              title={photo.alt}
              onClick={() => onChange(full)}
              className={cn(
                "relative rounded-md overflow-hidden aspect-video cursor-pointer transition-all duration-150 ring-offset-background",
                isSelected
                  ? "ring-2 ring-primary ring-offset-1"
                  : "hover:ring-2 hover:ring-primary/50 hover:ring-offset-1 opacity-80 hover:opacity-100"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbUrl(photo.id)}
                alt={photo.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {isSelected && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow">
                    <Check size={11} className="text-white" />
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
