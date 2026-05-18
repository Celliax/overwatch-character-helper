"use client"

import type { Hero, Role } from "@/lib/mock-data"
import { Plus } from "lucide-react"

interface HeroSlotProps {
  hero: Hero | null
  role: Role
  label: string
  onClick: () => void
  variant?: "myteam" | "enemy"
  size?: "lg" | "sm"
}

const ROLE_SHORT: Record<Role, string> = {
  탱커: "탱",
  딜러: "딜",
  서포터: "힐",
}

const ROLE_COLOR: Record<Role, string> = {
  탱커: "border-ow-blue",
  딜러: "border-red-500",
  서포터: "border-green-500",
}

export default function HeroSlot({
  hero,
  role,
  label,
  onClick,
  variant = "myteam",
  size = "sm",
}: HeroSlotProps) {
  const isLarge = size === "lg"

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 w-full
        bg-ow-panel border rounded transition-all
        hover:border-ow-blue hover:bg-ow-blue/10
        ${hero ? ROLE_COLOR[role] : "border-ow-border"}
        ${isLarge ? "p-3" : "px-3 py-2"}
      `}
    >
      {/* Portrait */}
      <div
        className={`
          flex-shrink-0 rounded bg-ow-bg flex items-center justify-center overflow-hidden
          ${isLarge ? "w-14 h-14" : "w-10 h-10"}
        `}
      >
        {hero ? (
          hero.portrait ? (
            // TODO: 실제 초상화 이미지로 교체
            <img src={hero.portrait} alt={hero.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-ow-muted text-xs text-center leading-tight px-1">
              {hero.name}
            </span>
          )
        ) : (
          <Plus size={isLarge ? 24 : 18} className="text-ow-muted" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 text-left">
        <div className="text-xs text-ow-muted">{label}</div>
        <div className={`font-semibold text-ow-text truncate ${isLarge ? "text-sm" : "text-xs"}`}>
          {hero ? hero.name : `${ROLE_SHORT[role]} 선택`}
        </div>
      </div>

      {/* Role badge */}
      <div
        className={`
          flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded
          ${role === "탱커" ? "bg-ow-blue/20 text-ow-blue" : ""}
          ${role === "딜러" ? "bg-red-500/20 text-red-400" : ""}
          ${role === "서포터" ? "bg-green-600/20 text-green-400" : ""}
        `}
      >
        {ROLE_SHORT[role]}
      </div>
    </button>
  )
}
