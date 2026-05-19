import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import type { AnalysisRequest } from "@/lib/types"

export async function POST(req: Request) {
  const body: AnalysisRequest = await req.json()
  const { myHero, myTeam, enemyTeam, map } = body

  const teamStr = (label: string, team: AnalysisRequest["myTeam"]) => {
    const members = [
      team.tank?.name,
      team.dps1?.name,
      team.dps2?.name,
      team.support1?.name,
      team.support2?.name,
    ]
      .filter(Boolean)
      .join(", ")
    return `${label}: ${members || "없음"}`
  }

  const prompt = `
당신은 오버워치 2 전문가 코치입니다. 아래 정보를 바탕으로 한국어로 분석해주세요.

[내 영웅]: ${myHero.name} (${myHero.role})
[맵]: ${map?.name ?? "미선택"} (${map?.type ?? ""})
${teamStr("우리팀", myTeam)}
${teamStr("상대팀", enemyTeam)}

다음 JSON 형식으로만 응답해주세요. 다른 텍스트는 포함하지 마세요:
{
  "heroRecommendation": "내 영웅 ${myHero.name}이 현재 팀 구성과 맵에 얼마나 잘 맞는지 2~3문장으로 설명",
  "perkRecommendations": {
    "minor1": "마이너 특전 1 추천 이름과 이유 (1문장)",
    "minor2": "마이너 특전 2 추천 이름과 이유 (1문장)",
    "major1": "메이저 특전 1 추천 이름과 이유 (1문장)",
    "major2": "메이저 특전 2 추천 이름과 이유 (1문장)"
  },
  "counterAnalysis": "상대팀 영웅들에 대한 상성 분석 2~3문장",
  "synergyAnalysis": "우리팀과의 시너지 분석 2~3문장",
  "overallTip": "전반적인 플레이 팁 2~3문장"
}
`

  try {
    const result = await generateText({
      model: google("gemini-3.1-flash-lite"),
      messages: [{ role: "user", content: prompt }],
    })

    const text = result.text.trim()
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return Response.json({ error: "AI 응답 파싱 실패" }, { status: 500 })
    }

    const parsed = JSON.parse(jsonMatch[0])
    return Response.json(parsed)
  } catch (error) {
    console.error("[v0] analyze error:", error)
    return Response.json({ error: "분석 중 오류가 발생했습니다." }, { status: 500 })
  }
}
