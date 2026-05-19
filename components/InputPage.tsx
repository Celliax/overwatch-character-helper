"use client"

import { useState } from "react"
import { HEROES, MAPS, type Hero, type Role } from "@/lib/mock-data"
import type { TeamComposition, AnalysisRequest } from "@/lib/types"
import HeroSlot from "./HeroSlot"
import HeroSelectModal from "./HeroSelectModal"
import { ChevronDown, Map as MapIcon, User } from "lucide-react"

interface InputPageProps {
  onAnalyze: (req: AnalysisRequest) => void
  isLoading: boolean
}

type SlotKey = "myHero" | "myTank" | "myDps1" | "myDps2" | "mySupport1" | "mySupport2" | "eTank" | "eDps1" | "eDps2" | "eSupport1" | "eSupport2"

// For "myHero", we don't strictly enforce a role, allowing the user to select any hero.
// If the UI expects a filter, we could pass undefined to show all heroes.
const SLOT_ROLES: Partial<Record<SlotKey, Role>> = {
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
    if (openSlot === "myHero") {
      setMyHero(hero)
      setOpenSlot(null)
      return
    }
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
    setOpenSlot(null)
  }

  // The analyze button requires a map to be selected and myHero to be set
  const canAnalyze = myHero !== null && currentMap !== null

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
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-ow-bg)] to-[var(--color-ow-bg-grad-end)] text-ow-text font-sans flex flex-col">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-ow-border/20 bg-ow-panel/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="bg-ow-blue w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-2xl shadow-lg shadow-ow-blue/20">W</div>
          <div className="text-2xl font-black italic tracking-widest text-white">HEY</div>
        </div>
        <div className="text-ow-muted font-semibold tracking-wide text-sm hidden sm:block">
          OVERWATCH AI MATCHUP ANALYZER
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col lg:flex-row items-stretch max-w-7xl mx-auto w-full p-6 sm:p-8 gap-8 lg:gap-12">
        
        {/* Left Column: Team Composition */}
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-6">
          
          {/* Ally Team */}
          <div className="flex-1 flex flex-col gap-3 w-full">
            <h2 className="text-ow-blue font-black italic tracking-widest text-xl mb-2 text-center drop-shadow-md">ALLY TEAM</h2>
            <HeroSlot hero={myTeam.tank} role="탱커" label="Tank" onClick={() => setOpenSlot("myTank")} variant="ally" />
            <HeroSlot hero={myTeam.dps1} role="딜러" label="Damage" onClick={() => setOpenSlot("myDps1")} variant="ally" />
            <HeroSlot hero={myTeam.dps2} role="딜러" label="Damage" onClick={() => setOpenSlot("myDps2")} variant="ally" />
            <HeroSlot hero={myTeam.support1} role="서포터" label="Support" onClick={() => setOpenSlot("mySupport1")} variant="ally" />
            <HeroSlot hero={myTeam.support2} role="서포터" label="Support" onClick={() => setOpenSlot("mySupport2")} variant="ally" />
          </div>

          {/* VS Divider */}
          <div className="flex flex-col items-center justify-center italic font-black text-4xl text-ow-muted/30 py-4 sm:py-0">
            <span className="sm:hidden">VS</span>
            <span className="hidden sm:inline">V<br/>S</span>
          </div>

          {/* Enemy Team */}
          <div className="flex-1 flex flex-col gap-3 w-full">
            <h2 className="text-ow-enemy font-black italic tracking-widest text-xl mb-2 text-center drop-shadow-md">ENEMY TEAM</h2>
            <HeroSlot hero={enemyTeam.tank} role="탱커" label="Tank" onClick={() => setOpenSlot("eTank")} variant="enemy" />
            <HeroSlot hero={enemyTeam.dps1} role="딜러" label="Damage" onClick={() => setOpenSlot("eDps1")} variant="enemy" />
            <HeroSlot hero={enemyTeam.dps2} role="딜러" label="Damage" onClick={() => setOpenSlot("eDps2")} variant="enemy" />
            <HeroSlot hero={enemyTeam.support1} role="서포터" label="Support" onClick={() => setOpenSlot("eSupport1")} variant="enemy" />
            <HeroSlot hero={enemyTeam.support2} role="서포터" label="Support" onClick={() => setOpenSlot("eSupport2")} variant="enemy" />
          </div>
        </div>

        {/* Right Column: Setup & Analysis */}
        <div className="w-full lg:w-[450px] flex flex-col gap-6">
          
          {/* My Character Showcase */}
          <div 
            className={`
              relative overflow-hidden rounded-2xl bg-ow-panel/50 border backdrop-blur-sm transition-all flex flex-col
              ${myHero ? 'border-ow-blue/50 shadow-[0_0_30px_-5px_rgba(49,163,191,0.3)]' : 'border-ow-border/30 hover:border-ow-border/60'}
            `}
          >
            <div className="p-6 pb-4 flex items-center justify-between z-10 relative">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <User size={20} className="text-ow-blue" />
                내 캐릭터
              </h3>
              <button 
                onClick={() => setOpenSlot("myHero")}
                className="text-xs bg-black/40 hover:bg-black/60 text-ow-muted hover:text-white px-3 py-1.5 rounded-full transition-colors border border-ow-border/50"
              >
                변경하기
              </button>
            </div>
            
            <div className="px-6 pb-6 flex items-end gap-6 z-10 relative">
              <div 
                onClick={() => setOpenSlot("myHero")}
                className={`
                  w-28 h-36 rounded-xl flex-shrink-0 flex items-center justify-center cursor-pointer transition-transform hover:scale-105
                  ${myHero ? 'bg-gradient-to-t from-ow-blue/30 to-transparent border-2 border-ow-blue' : 'bg-black/40 border-2 border-dashed border-ow-muted/40'}
                `}
              >
                {myHero ? (
                  myHero.portrait ? (
                    <img src={myHero.portrait} alt={myHero.name} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <span className="font-black text-2xl text-ow-blue/50 transform -rotate-12 whitespace-nowrap overflow-hidden text-ellipsis px-2 max-w-full">{myHero.name}</span>
                  )
                ) : (
                  <div className="text-ow-muted/50 flex flex-col items-center gap-2">
                    <User size={32} />
                    <span className="text-xs font-bold uppercase">Select</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 pb-2">
                {myHero ? (
                  <>
                    <div className="text-ow-blue text-sm font-bold mb-1 uppercase tracking-wider">{myHero.role}</div>
                    <div className="text-4xl font-black italic tracking-wide text-white drop-shadow-lg break-keep">{myHero.name}</div>
                  </>
                ) : (
                  <div className="text-xl font-bold text-ow-muted/40 italic break-keep">영웅을 선택해주세요</div>
                )}
              </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-ow-blue/10 blur-3xl rounded-full z-0 pointer-events-none" />
          </div>

          {/* Map Showcase */}
          <div className="relative overflow-hidden rounded-2xl bg-ow-panel/50 border border-ow-border/30 backdrop-blur-sm flex flex-col flex-1">
            <div className="p-6 pb-4 flex items-center justify-between z-10 relative">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <MapIcon size={20} className="text-ow-muted" />
                전장 선택
              </h3>
            </div>
            
            <div className="px-6 pb-6 flex-1 flex flex-col z-10 relative">
              <div className="relative">
                <button
                  onClick={() => setMapOpen(!mapOpen)}
                  className="w-full flex items-center justify-between gap-2 bg-black/40 border border-ow-border/50 rounded-lg px-4 py-3 text-white hover:border-ow-blue/50 transition-colors"
                >
                  <span className="font-bold truncate">{currentMap ? currentMap.name : "맵을 선택해주세요"}</span>
                  <ChevronDown size={18} className={`flex-shrink-0 transition-transform duration-200 ${mapOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {mapOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a202c] border border-ow-border rounded-lg shadow-xl overflow-y-auto max-h-60 z-50 p-2">
                    {MAPS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          setSelectedMap(m.id)
                          setMapOpen(false)
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors flex justify-between items-center group
                          ${selectedMap === m.id ? "bg-ow-blue/20 text-ow-blue" : "text-ow-muted hover:bg-white/5 hover:text-white"}`}
                      >
                        <span className="font-bold truncate">{m.name}</span>
                        <span className={`text-xs ml-2 flex-shrink-0 ${selectedMap === m.id ? "text-ow-blue/70" : "text-ow-muted/50 group-hover:text-ow-muted"}`}>
                          {m.type}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Map Image Placeholder */}
              <div className="mt-4 flex-1 min-h-[120px] rounded-lg bg-black/30 border border-ow-border/20 flex items-center justify-center overflow-hidden relative group">
                 {currentMap ? (
                   // Replace with actual map image later
                   <div className="absolute inset-0 bg-gradient-to-br from-ow-panel to-black flex items-center justify-center">
                     <span className="font-black text-4xl text-white/5 italic opacity-50 transform -rotate-12 pointer-events-none break-keep text-center px-4">{currentMap.name}</span>
                   </div>
                 ) : (
                   <div className="text-ow-muted/30 flex flex-col items-center gap-2">
                     <MapIcon size={32} />
                     <span className="text-xs font-bold uppercase tracking-widest text-center">No Map<br/>Selected</span>
                   </div>
                 )}
              </div>
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze || isLoading}
            className={`
              w-full py-5 rounded-2xl font-black text-2xl italic tracking-wider transition-all relative overflow-hidden group
              ${canAnalyze && !isLoading
                ? "bg-ow-blue text-white shadow-[0_10px_40px_-10px_rgba(49,163,191,0.5)] hover:scale-[1.02] hover:bg-ow-blue-dark active:scale-95"
                : "bg-ow-panel border border-ow-border/50 text-ow-muted/50 cursor-not-allowed"
              }
            `}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>분석 중...</span>
                </>
              ) : (
                "분석하기"
              )}
            </div>
          </button>
          
        </div>
      </main>

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
