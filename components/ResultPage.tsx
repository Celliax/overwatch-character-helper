"use client"

import type { AnalysisRequest, AnalysisResult } from "@/lib/types"
import { ArrowLeft, Shield, Swords, Users, Lightbulb } from "lucide-react"

interface ResultPageProps {
  request: AnalysisRequest
  result: AnalysisResult
  onBack: () => void
}

interface PerkCardProps {
  label: string
  content: string
  type: "minor" | "major"
}

function PerkCard({ label, content, type }: PerkCardProps) {
  return (
    <div className="bg-ow-panel border border-ow-border rounded p-3 flex flex-col gap-1 hover:border-ow-blue transition-colors">
      <div className="flex items-center gap-2">
        {/* TODO: 실제 특전 아이콘 이미지 삽입 위치 */}
        <div className="w-8 h-8 rounded bg-ow-bg border border-ow-border flex items-center justify-center text-ow-muted text-[10px]">
          아이콘
        </div>
        <div className="flex flex-col">
          <span
            className={`text-[10px] font-semibold uppercase tracking-wide
            ${type === "major" ? "text-ow-blue" : "text-ow-muted"}`}
          >
            {type === "major" ? "메이저" : "마이너"} 특전
          </span>
          <span className="text-xs font-bold text-ow-text leading-tight">{label}</span>
        </div>
      </div>
      <p className="text-xs text-ow-muted leading-relaxed">{content}</p>
    </div>
  )
}

function AnalysisSection({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode
  title: string
  content: string
}) {
  return (
    <div className="bg-ow-panel border border-ow-border rounded p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-ow-blue">{icon}</span>
        <span className="text-sm font-bold text-ow-text">{title}</span>
      </div>
      <p className="text-sm text-ow-muted leading-relaxed">{content}</p>
    </div>
  )
}

export default function ResultPage({ request, result, onBack }: ResultPageProps) {
  const { myHero, map } = request

  // Parse perk name and reason from LLM response (format: "이름: 이유" or just full text)
  const parsePerk = (text: string): { name: string; reason: string } => {
    const colonIdx = text.indexOf(":")
    if (colonIdx > 0 && colonIdx < 30) {
      return {
        name: text.slice(0, colonIdx).trim(),
        reason: text.slice(colonIdx + 1).trim(),
      }
    }
    return { name: "추천 특전", reason: text }
  }

  const minor1 = parsePerk(result.perkRecommendations.minor1)
  const minor2 = parsePerk(result.perkRecommendations.minor2)
  const major1 = parsePerk(result.perkRecommendations.major1)
  const major2 = parsePerk(result.perkRecommendations.major2)

  return (
    <div className="flex min-h-screen bg-ow-bg">
      {/* Left blue panel */}
      <div className="w-16 bg-ow-blue flex-shrink-0" />

      {/* Main content */}
      <div className="flex-1 flex flex-col py-8 px-6 gap-6 max-w-4xl mx-auto w-full">

        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-ow-muted hover:text-ow-blue transition-colors text-sm w-fit"
        >
          <ArrowLeft size={16} />
          다시 입력하기
        </button>

        {/* Title */}
        <h1 className="text-ow-text font-bold text-lg">
          {myHero.name} 분석 결과
          {map && (
            <span className="ml-2 text-sm font-normal text-ow-muted">— {map.name}</span>
          )}
        </h1>

        {/* Top section: Hero portrait + AI fit analysis */}
        <div className="flex gap-4 items-stretch">
          {/* Hero portrait */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            {/* TODO: 실제 영웅 초상화 이미지 경로로 교체 */}
            <div className="w-32 h-32 bg-ow-panel border-2 border-ow-blue rounded-lg flex items-center justify-center text-ow-muted text-xs text-center p-2">
              영웅 초상화
              <br />
              <span className="text-ow-blue font-bold text-sm mt-1 block">{myHero.name}</span>
            </div>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded
                ${myHero.role === "탱커" ? "bg-ow-blue/20 text-ow-blue" : ""}
                ${myHero.role === "딜러" ? "bg-red-500/20 text-red-400" : ""}
                ${myHero.role === "서포터" ? "bg-green-600/20 text-green-400" : ""}
              `}
            >
              {myHero.role}
            </span>
          </div>

          {/* AI recommendation text */}
          <div className="flex-1 bg-ow-panel border border-ow-blue rounded-lg p-4 flex flex-col justify-center">
            <div className="text-xs text-ow-blue font-semibold mb-2 flex items-center gap-1">
              <Lightbulb size={12} />
              AI가 내 캐릭이 게임에 잘 맞나 알려줌
            </div>
            <p className="text-sm text-ow-text leading-relaxed">
              {result.heroRecommendation}
            </p>
          </div>
        </div>

        {/* Perk recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Minor perks */}
          <div>
            <div className="text-xs font-semibold text-ow-muted mb-2 uppercase tracking-wide">
              특전 좋은거 알려주기 (마이너)
            </div>
            <div className="grid grid-cols-2 gap-2">
              <PerkCard label={minor1.name} content={minor1.reason} type="minor" />
              <PerkCard label={minor2.name} content={minor2.reason} type="minor" />
            </div>
          </div>

          {/* Major perks */}
          <div>
            <div className="text-xs font-semibold text-ow-muted mb-2 uppercase tracking-wide">
              특전 좋은거 알려주기 (메이저)
            </div>
            <div className="grid grid-cols-2 gap-2">
              <PerkCard label={major1.name} content={major1.reason} type="major" />
              <PerkCard label={major2.name} content={major2.reason} type="major" />
            </div>
          </div>
        </div>

        {/* Detailed analysis sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <AnalysisSection
            icon={<Swords size={16} />}
            title="상성 분석"
            content={result.counterAnalysis}
          />
          <AnalysisSection
            icon={<Users size={16} />}
            title="팀 시너지"
            content={result.synergyAnalysis}
          />
          <AnalysisSection
            icon={<Shield size={16} />}
            title="플레이 팁"
            content={result.overallTip}
          />
        </div>

        {/* Analyze again button */}
        <div className="flex justify-center mt-2">
          <button
            onClick={onBack}
            className="px-8 py-2.5 bg-ow-blue text-white rounded font-bold text-sm hover:bg-ow-blue-dark transition-colors"
          >
            다시 분석하기
          </button>
        </div>
      </div>

      {/* Right blue panel */}
      <div className="w-16 bg-ow-blue flex-shrink-0" />
    </div>
  )
}
