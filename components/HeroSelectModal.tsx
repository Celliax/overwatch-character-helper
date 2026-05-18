"use client"

import { useState } from "react"
import { HEROES, type Hero, type Role } from "@/lib/mock-data"
import { X } from "lucide-react"

interface HeroSelectModalProps {
  open: boolean
  onClose: () => void
  onSelect: (hero: Hero) => void
  filterRole?: Role
  title?: string
}

const ROLE_COLORS: Record<Role, string> = {
  탱커: "bg-ow-blue text-white",
  딜러: "bg-red-500 text-white",
  서포터: "bg-green-600 text-white",
}

export default function HeroSelectModal({
  open,
  onClose,
  onSelect,
  filterRole,
  title = "영웅 선택",
}: HeroSelectModalProps) {
  const [search, setSearch] = useState("")

  if (!open) return null

  const filtered = HEROES.filter((h) => {
    const matchRole = filterRole ? h.role === filterRole : true
    const matchSearch = h.name.toLowerCase().includes(search.toLowerCase())
    return matchRole && matchSearch
  })

  const grouped: Record<Role, Hero[]> = {
    탱커: filtered.filter((h) => h.role === "탱커"),
    딜러: filtered.filter((h) => h.role === "딜러"),
    서포터: filtered.filter((h) => h.role === "서포터"),
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div className="relative bg-ow-panel border border-ow-border rounded-lg w-[480px] max-h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-ow-border">
          <span className="font-bold text-ow-text text-lg">{title}</span>
          <button
            onClick={onClose}
            className="text-ow-muted hover:text-ow-text transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-ow-border">
          <input
            type="text"
            placeholder="영웅 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-ow-bg border border-ow-border rounded px-3 py-2 text-sm text-ow-text placeholder-ow-muted focus:outline-none focus:border-ow-blue"
          />
        </div>

        {/* Hero List */}
        <div className="overflow-y-auto flex-1 p-3 space-y-4">
          {(["탱커", "딜러", "서포터"] as Role[]).map((role) => {
            if (grouped[role].length === 0) return null
            return (
              <div key={role}>
                <div className="text-xs font-semibold text-ow-muted mb-2 uppercase tracking-wide">
                  {role}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {grouped[role].map((hero) => (
                    <button
                      key={hero.id}
                      onClick={() => {
                        onSelect(hero)
                        onClose()
                      }}
                      className="flex flex-col items-center gap-1 p-2 rounded bg-ow-bg hover:bg-ow-blue/20 border border-ow-border hover:border-ow-blue transition-all group"
                    >
                      {/* TODO: 실제 영웅 초상화로 교체 */}
                      <div className="w-12 h-12 rounded bg-ow-border flex items-center justify-center text-ow-muted text-xs">
                        초상화
                      </div>
                      <span className="text-xs text-ow-text group-hover:text-ow-blue font-medium text-center leading-tight">
                        {hero.name}
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${ROLE_COLORS[hero.role]}`}
                      >
                        {hero.role}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
