"use client"

import { useState } from "react"
import { HEROES, MAPS, type Hero, type Role } from "@/lib/mock-data"
import type { TeamComposition, AnalysisRequest } from "@/lib/types"
import HeroSlot from "./HeroSlot"
import HeroSelectModal from "./HeroSelectModal"
import { ChevronDown } from "lucide-react"

interface InputPageProps {
  onAnalyze: (req: AnalysisRequest) => void
  isLoading: boolean
}

type SlotKey = "myHero" | "myTank" | "myDps1" | "myDps2" | "mySupport1" | "mySupport2" | "eTank" | "eDps1" | "eDps2" | "eSupport1" | "eSupport2"

const SLOT_ROLES: Record<SlotKey, Role> = {
  myHero: "딜러",
  myTank: "탱커",
  myDps1: "딜러",
  myDps2: "딜러",
  mySupport1: "서포터",
  mySupport2: "서포터",
  eTank: "탱커",
  eDps1: "딜러",
  eDps2: "딜러",
  eSupport1: "서포터",
  eSupport2: "서포터",
}

export default function InputPage({ onAnalyze, isLoading }: InputPageProps) {
  const [myHero, setMyHero] = useState<Hero | null>(null)
  const [myTeam, setMyTeam] = useState<TeamComposition>({
    tank: null,
    dps1: null,
    dps2: null,
    support1: null,
    support2: null,
  })
  const [enemyTeam, setEnemyTeam] = useState<TeamComposition>({
    tank: null,
    dps1: null,
    dps2: null,
    support1: null,
    support2: null,
  })
  const [selectedMap, setSelectedMap] = useState<string>("")
  const [openSlot, setOpenSlot] = useState<SlotKey | null>(null)
  const [mapOpen, setMapOpen] = useState(false)

  const currentSlotRole = openSlot ? SLOT_ROLES[openSlot] : undefined
  const currentMap = MAPS.find((m) => m.id === selectedMap) ?? null

  const getHeroForSlot = (slot: SlotKey): Hero | null => {
    if (slot === "myHero") return myHero
    if (slot === "myTank") return myTeam.tank
    if (slot === "myDps1") return myTeam.dps1
    if (slot === "myDps2") return myTeam.dps2
    if (slot === "mySupport1") return myTeam.support1
    if (slot === "mySupport2") return myTeam.support2
    if (slot === "eTank") return enemyTeam.tank
    if (slot === "eDps1") return enemyTeam.dps1
    if (slot === "eDps2") return enemyTeam.dps2
    if (slot === "eSupport1") return enemyTeam.support1
    if (slot === "eSupport2") return enemyTeam.support2
    return null
  }

  const handleHeroSelect = (hero: Hero) => {
    if (!openSlot) return
    if (openSlot === "myHero") return setMyHero(hero)
    setMyTeam((prev) => {
      if (openSlot === "myTank") return { ...prev, tank: hero }
      if (openSlot === "myDps1") return { ...prev, dps1: hero }
      if (openSlot === "myDps2") return { ...prev, dps2: hero }
      if (openSlot === "mySupport1") return { ...prev, support1: hero }
      if (openSlot === "mySupport2") return { ...prev, support2: hero }
      return prev
    })
    setEnemyTeam((prev) => {
      if (openSlot === "eTank") return { ...prev, tank: hero }
      if (openSlot === "eDps1") return { ...prev, dps1: hero }
      if (openSlot === "eDps2") return { ...prev, dps2: hero }
      if (openSlot === "eSupport1") return { ...prev, support1: hero }
      if (openSlot === "eSupport2") return { ...prev, support2: hero }
      return prev
    })
  }

  const canAnalyze = myHero !== null

  const handleAnalyze = () => {
    if (!myHero) return
    onAnalyze({
      myHero,
      myTeam,
      enemyTeam,
      map: currentMap,
    })
  }

  return (
    <div className="flex min-h-screen bg-ow-bg">
      {/* Left blue panel */}
      <div className="w-16 bg-ow-blue flex-shrink-0" />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center py-10 px-6 gap-6">

        {/* Title */}
        <h1 className="text-ow-text font-bold text-xl tracking-wide">오버워치 AI 상성 분석기</h1>

        {/* My Hero selector (top center) */}
        <div className="flex flex-col items-center gap-2 w-full max-w-xs">
          <span className="text-ow-muted text-sm font-semibold">내 영웅</span>
          <HeroSlot
            hero={myHero}
            role={myHero?.role ?? "딜러"}
            label="내 영웅 선택"
            onClick={() => setOpenSlot("myHero")}
            size="lg"
          />
        </div>

        {/* Team composition grid */}
        <div className="w-full max-w-3xl grid grid-cols-[1fr_auto_1fr_auto] gap-x-4 gap-y-2 items-start">

          {/* Our team header */}
          <div className="text-sm font-semibold text-ow-muted text-center">우리팀</div>
          {/* Spacer for map column */}
          <div />
          {/* Enemy team header */}
          <div className="text-sm font-semibold text-ow-muted text-center">상대팀</div>
          {/* Map header */}
          <div className="text-sm font-semibold text-ow-muted text-center">맵</div>

          {/* Tank row */}
          <HeroSlot hero={myTeam.tank} role="탱커" label="우리 탱" onClick={() => setOpenSlot("myTank")} />
          <div />
          <HeroSlot hero={enemyTeam.tank} role="탱커" label="상대 탱" onClick={() => setOpenSlot("eTank")} />
          {/* Map selector - spans all rows */}
          <div className="row-span-5 flex flex-col">
            <button
              onClick={() => setMapOpen(!mapOpen)}
              className="flex items-center justify-between gap-1 bg-ow-panel border border-ow-border rounded px-3 py-2 text-ow-text text-xs hover:border-ow-blue transition-colors w-full"
            >
              <span className="truncate">{currentMap ? currentMap.name : "맵 선택"}</span>
              <ChevronDown size={14} className="flex-shrink-0" />
            </button>
            {mapOpen && (
              <div className="mt-1 bg-ow-panel border border-ow-border rounded overflow-y-auto max-h-64 z-10">
                {MAPS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedMap(m.id)
                      setMapOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-ow-blue/20 hover:text-ow-blue transition-colors
                      ${selectedMap === m.id ? "bg-ow-blue/20 text-ow-blue" : "text-ow-text"}`}
                  >
                    {m.name}
                    <span className="ml-1 text-ow-muted">({m.type})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DPS 1 row */}
          <HeroSlot hero={myTeam.dps1} role="딜러" label="우리 딜" onClick={() => setOpenSlot("myDps1")} />
          <div />
          <HeroSlot hero={enemyTeam.dps1} role="딜러" label="상대 딜" onClick={() => setOpenSlot("eDps1")} />

          {/* DPS 2 row */}
          <HeroSlot hero={myTeam.dps2} role="딜러" label="우리 딜" onClick={() => setOpenSlot("myDps2")} />
          <div />
          <HeroSlot hero={enemyTeam.dps2} role="딜러" label="상대 딜" onClick={() => setOpenSlot("eDps2")} />

          {/* Support 1 row */}
          <HeroSlot hero={myTeam.support1} role="서포터" label="우리 힐" onClick={() => setOpenSlot("mySupport1")} />
          <div />
          <HeroSlot hero={enemyTeam.support1} role="서포터" label="상대 힐" onClick={() => setOpenSlot("eSupport1")} />

          {/* Support 2 row */}
          <HeroSlot hero={myTeam.support2} role="서포터" label="우리 힐" onClick={() => setOpenSlot("mySupport2")} />
          <div />
          <HeroSlot hero={enemyTeam.support2} role="서포터" label="상대 힐" onClick={() => setOpenSlot("eSupport2")} />
        </div>

        {/* Analyze button */}
        <button
          onClick={handleAnalyze}
          disabled={!canAnalyze || isLoading}
          className={`
            mt-4 px-10 py-3 rounded font-bold text-sm tracking-wide transition-all
            ${canAnalyze && !isLoading
              ? "bg-ow-blue text-white hover:bg-ow-blue-dark shadow-lg hover:shadow-ow-blue/40"
              : "bg-ow-border text-ow-muted cursor-not-allowed"
            }
          `}
        >
          {isLoading ? "분석 중..." : "분석하기"}
        </button>

        {!canAnalyze && (
          <p className="text-ow-muted text-xs">내 영웅을 선택해주세요</p>
        )}
      </div>

      {/* Right blue panel */}
      <div className="w-16 bg-ow-blue flex-shrink-0" />

      {/* Hero Select Modal */}
      <HeroSelectModal
        open={openSlot !== null}
        onClose={() => setOpenSlot(null)}
        onSelect={handleHeroSelect}
        filterRole={currentSlotRole}
        title={openSlot === "myHero" ? "내 영웅 선택" : "영웅 선택"}
      />
    </div>
  )
}
