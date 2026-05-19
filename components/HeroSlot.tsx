"use client"

import type { Hero, Role } from "@/lib/mock-data"
import { Plus } from "lucide-react"

interface HeroSlotProps {
  hero: Hero | null
  role: Role
  label: string
  onClick: () => void
  variant?: "ally" | "enemy"
}

// Temporary text icons, you can replace with SVG later
const ROLE_ICONS: Record<Role, string> = {
  탱커: "🛡️",
  딜러: "⚔️",
  서포터: "➕",
}

export default function HeroSlot({
  hero,
  role,
  label,
  onClick,
  variant = "ally",
}: HeroSlotProps) {
  const isAlly = variant === "ally"
  const hoverBorderColor = isAlly ? "hover:border-ow-blue" : "hover:border-ow-enemy"
  const hoverBgColor = isAlly ? "hover:bg-ow-blue/10" : "hover:bg-ow-enemy/10"
  
  const activeBorderColor = isAlly ? "border-ow-blue/50" : "border-ow-enemy/50"
  const activePortraitBorder = isAlly ? "border-ow-blue" : "border-ow-enemy"

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 w-full p-2
        bg-ow-panel/60 border rounded-lg transition-all
        ${hoverBorderColor} ${hoverBgColor}
        ${hero ? activeBorderColor : "border-ow-border/30"}
      `}
    >
      {/* Portrait */}
      <div
        className={`
          flex-shrink-0 w-12 h-12 rounded-md bg-black/40 flex items-center justify-center overflow-hidden
          border ${hero ? activePortraitBorder : "border-dashed border-ow-muted/30"}
        `}
      >
        {hero ? (
          hero.portrait ? (
            <img src={hero.portrait} alt={hero.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-ow-text font-bold text-xs text-center leading-tight px-1">
              {hero.name}
            </span>
          )
        ) : (
          <Plus size={20} className="text-ow-muted/50" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 text-left flex flex-col justify-center">
        <div className="flex items-center gap-1.5 text-xs text-ow-muted/70 mb-0.5">
          <span className="text-[10px] grayscale opacity-70">{ROLE_ICONS[role]}</span>
          <span className="uppercase tracking-wider text-[10px] font-bold">{label}</span>
        </div>
        <div className={`font-bold truncate ${hero ? "text-ow-text" : "text-ow-muted/50"} text-sm`}>
          {hero ? hero.name : "Select Hero"}
        </div>
      </div>
    </button>
  )
}
